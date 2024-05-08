import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Navbar from '../../components/Navbar/Navbar';

import classes from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Box, useColorMode } from '@chakra-ui/react';
import { InvizLogo } from '../../images';
import { useEffect } from 'react';

const Landingpage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (colorMode === 'dark') {
      toggleColorMode();
    }
  }, []);

  const handleNavigation = () => {
    if (user) {
      navigate('/dashboard/main');
    } else {
      navigate('/login');
    }
  };
  return (
    <>
      <Navbar />

      <section className={classes.section1}>
        <div className={classes.mainContent}>
          <h1>Invoicing That Helps Small</h1>
          <h1>Businesses Get Paid Faster</h1>
          <p>
            Torrel Alexis Invoicing that helps you get paid faster.Torrel Alexis Invoicing that
            helps you get paid faster.Torrel Alexis Invoicing that helps you get paid faster.Torrel
            Alexis Invoicing that helps you get paid faster.
          </p>
          <div className={classes.contentBtns}>
            <button variant="outlined" onClick={handleNavigation}>
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className={classes.section2}>
        <div className={classes.heading}>
          <p>Explore Small Business Invoicing </p>
          <h2>Enjoy Our Invoicing Features</h2>
        </div>
        <div className={classes.featureFlex}>
          <div>
            {/* <img src={icon1} alt="" /> */}
            <span>Send Invoices</span>
          </div>
          <div>
            {/* <img src={icon2} alt="" /> */}
            <span>Track Expenses </span>
          </div>
          <div>
            {/* <img src={icon3} alt="" /> */}
            <span>create reports </span>
          </div>
          <div>
            {/* <img src={icon4} alt="" /> */}
            <span> manage clients</span>
          </div>
          <div>
            {/* <img src={icon5} alt="" /> */}
            <span>track payments</span>
          </div>
          <div>
            {/* <img src={icon6} alt="" /> */}
            <span>multi currency</span>
          </div>
        </div>
      </section>

      <section className={classes.section3}>
        <div className={classes.section3_first}>
          <SectionHeading
            headingText="Create professional invoices in seconds"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>{/* <img src={desktop2} alt="" /> */}</div>
        </div>
        <div className={classes.section3_second}>
          <SectionHeading
            headingText=" Send Invoices by email"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>{/* <img src={desktop3} alt="" /> */}</div>
        </div>
        <div className={classes.section3_third}>
          <SectionHeading
            headingText=" Keep track of who’s paid (and who hasn’t)"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>{/* <img src={desktop4} alt="" /> */}</div>
        </div>
        <div className={classes.section3_fourth}>
          <SectionHeading
            headingText="Accept payments online"
            headingPara="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          />
          <div className={classes.imgContainer}>{/* <img src={desktop5} alt="" /> */}</div>
        </div>
      </section>

      <section className={classes.section5}>
        <div className={classes.heading}>
          <h2>
            Spend less time creating and <br />
            sending invoices
          </h2>
          <p>
            And more time on the things that matter. Sign up to our free trial. No credit card
            required.
          </p>
        </div>
        <center>
          <button variant="outlined" onClick={() => navigate('/login')}>
            Get Started
          </button>
          <button variant="outlined" onClick={() => navigate('/login')}>
            Try For Free
          </button>
        </center>
      </section>

      <Box bg={'white'} h={2}></Box>

      <footer className={classes.footerSection}>
        <div className={classes.footer}>
          <div className={classes.first}>
            <img src={InvizLogo} alt="" />
            <div className={classes.firstInner}>
              <span>hello@torrelalexis.com</span>
              <span>Contact Form</span>

              <div>
                <span>Torrel Limited </span>
                <span>2022 Wenlock Road</span>
              </div>
            </div>
          </div>
          <div className={classes.second}>
            <h2>QIUCK LINKS</h2>
            <div>
              <span>Torrel Blog</span>
              <span>Invoice Template</span>
              <span>Business Plan</span>
              <span>Credit Note</span>
              <span>Small Business</span>
            </div>
          </div>
          <div className={classes.third}>
            <div>
              <span>Help Center</span>
              <span>Integration</span>
              <span>Accounting </span>
              <span>Sample Invoice </span>
              <span>Find an accountant</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landingpage;
