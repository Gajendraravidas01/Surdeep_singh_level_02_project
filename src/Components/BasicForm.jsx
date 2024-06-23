import React, { useState } from 'react';

const BasicForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    managementExperience: '',
    skills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    interviewTime: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.fullName = formData.fullName ? "" : "Full Name is required.";
    tempErrors.email = (/\S+@\S+\.\S+/).test(formData.email) ? "" : "Email is not valid.";
    tempErrors.phone = formData.phone.match(/^[0-9]+$/) ? "" : "Phone number is not valid.";
    if (formData.position === 'Developer' || formData.position === 'Designer') {
      tempErrors.experience = formData.experience > 0 ? "" : "Relevant Experience is required and must be greater than 0.";
    }
    if (formData.position === 'Designer') {
      tempErrors.portfolio = (formData.portfolio.match(/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/)) ? "" : "Portfolio URL is not valid.";
    }
    if (formData.position === 'Manager') {
      tempErrors.managementExperience = formData.managementExperience ? "" : "Management Experience is required.";
    }
    tempErrors.skills = Object.values(formData.skills).some(skill => skill) ? "" : "At least one skill must be selected.";
    tempErrors.interviewTime = formData.interviewTime ? "" : "Preferred Interview Time is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).every(key => tempErrors[key] === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <h2>Job Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Applying for Position:</label>
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(formData.position === 'Developer' || formData.position === 'Designer') && (
          <div className="form-group">
            <label>Relevant Experience (years):</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            {errors.experience && <span className="error">{errors.experience}</span>}
          </div>
        )}
        {formData.position === 'Designer' && (
          <div className="form-group">
            <label>Portfolio URL:</label>
            <input
              type="text"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
            />
            {errors.portfolio && <span className="error">{errors.portfolio}</span>}
          </div>
        )}
        {formData.position === 'Manager' && (
          <div className="form-group">
            <label>Management Experience:</label>
            <input
              type="text"
              name="managementExperience"
              value={formData.managementExperience}
              onChange={handleChange}
            />
            {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
          </div>
        )}
        <div className="form-group">
          <label>Additional Skills:</label>
          <label>
            <input
              type="checkbox"
              name="JavaScript"
              checked={formData.skills.JavaScript}
              onChange={handleChange}
            /> JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="CSS"
              checked={formData.skills.CSS}
              onChange={handleChange}
            /> CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="Python"
              checked={formData.skills.Python}
              onChange={handleChange}
            /> Python
          </label>
          {errors.skills && <span className="error">{errors.skills}</span>}
        </div>
        <div className="form-group">
          <label>Preferred Interview Time:</label>
          <input
            type="datetime-local"
            name="interviewTime"
            value={formData.interviewTime}
            onChange={handleChange}
          />
          {errors.interviewTime && <span className="error">{errors.interviewTime}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div className="summary">
          <h3>Summary of Entered Data:</h3>
          <p>Full Name: {formData.fullName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone Number: {formData.phone}</p>
          <p>Applying for Position: {formData.position}</p>
          {(formData.position === 'Developer' || formData.position === 'Designer') && (
            <p>Relevant Experience: {formData.experience} years</p>
          )}
          {formData.position === 'Designer' && <p>Portfolio URL: {formData.portfolio}</p>}
          {formData.position === 'Manager' && <p>Management Experience: {formData.managementExperience}</p>}
          <p>Additional Skills:</p>
          <ul>
            {Object.keys(formData.skills).map(skill => (
              formData.skills[skill] && <li key={skill}>{skill}</li>
            ))}
          </ul>
          <p>Preferred Interview Time: {formData.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default BasicForm;
