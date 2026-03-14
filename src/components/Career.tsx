import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Web Developer & Designer</h4>
                <h5>Freelance</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Started taking independent client projects building websites,
              designing UI, and delivering 3D visual assets. Developed real-
              world skills outside the classroom.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Designer & Developer</h4>
                <h5>Self-Employed / Independent</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Expanded into full-stack projects and 3D animation work. Took on
              more complex client briefs involving branding, motion, and
              interactive web experiences.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer & Visual Designer</h4>
                <h5>Riva Group</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Developed a custom web experience for a real estate project,
              including interactive layouts and modern web features to improve
              user engagement and showcase property details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
