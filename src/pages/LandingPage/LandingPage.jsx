import SectionHeading from '../../components/SectionHeading/SectionHeading';
import Navbar from '../../components/Navbar/Navbar';
import CustomTableContainer from '../../components/CustomTableContainer/CustomTableContainer';
import classes from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Box, Button, useColorMode, useDisclosure } from '@chakra-ui/react';
import { InvizLogo, PaktechLogo } from '../../images';
import { useEffect } from 'react';
import CustomPlainCard from '../../components/CustomPlainCard/CustomPlainCard';
import CustomViewCard from '../../components/CustomViewCard/CustomViewCard';
import InfoCard from '../../components/InfoCard/InfoCard';
import { TbAdjustmentsDollar, TbCurrencyDollarOff } from 'react-icons/tb';
import Header from '../../components/Header/Header';
import Drawer, { MobileDrawer } from '../../components/CustomDrawer/Drawer';

const tableHeaderText = ['client', 'date', 'email', 'amount', 'project/job', 'action']; // this is table static heading
const tableData = [
  {
    client: 'neymar jr',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'job',
    status: 'complete',
  },
  {
    client: 'CR7',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'job',
    status: 'failed',
  },
  {
    client: 'mbappe ',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'project',
    status: 'pending',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'project',
    status: 'pending',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'project',
    status: 'pending',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'project',
    status: 'pending',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'project',
    status: 'pending',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '$ 400',
    project: 'project',
    status: 'pending',
  },
]; // this is table static data

// second table
const tableHeaderTextSec = ['client name', 'date joining', 'email', 'count']; // this is table static heading
const tableDataSec = [
  {
    client: 'neymar jr',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
  {
    client: 'CR7',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
  {
    client: 'mbappe ',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
  {
    client: 'jhon smith',
    date: 'DD MM YYYY',
    email: 'example@gmail.com',
    amount: '+923252105103',
  },
]; // this is table static data

const Landingpage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // this is for drawer
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

      {/* className={classes.footer} for fix layout css className="grid grid-cols-1 md:grid-cols-3" */}
      <footer className={classes.footerSection}>
        <div className={classes.footer}>
          <div className={classes.first}>
            <img src={PaktechLogo} alt="" />
            <div className={classes.firstInner}>
              <span>hello@inviztechnologies.net</span>
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

      {/* <div className="mx-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-4">
        <div className="col-span-4 md:col-span-1">
          <span className="block lg:hidden absolute z-10">
            <Button colorScheme="blue" onClick={onOpen}>
              Menu
            </Button>
          </span>
          <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
          <span className="hidden lg:block">
            <Drawer />
          </span>
        </div>
        <div className="col-span-3">
          <main className="bg-slate-50 p-4">
           <Header /> 
            <section className="container w-full mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-4 md:grid-cols-3 my-4">
              <div className="sm:col-span-2 md:col-span-1">
                <CustomViewCard
                  headText={'total volume'}
                  menuItems={['fist item', 'second item', 'third item']}
                  percentageAmount={'+200'}
                  mathsNum={'8025345.4232'}
                />
              </div>
              <div className="sm:col-span-2 md:col-span-1">
                <CustomViewCard
                  headText={'total transaction'}
                  menuItems={['2.fist item', '2.second item', '2.third item']}
                  percentageAmount={'-2.48'}
                  mathsNum={'500'}
                />
              </div>
              <div className="sm:col-span-4 md:col-span-1">
                <CustomViewCard
                  headText={'payable amount'}
                  menuItems={['3.fist item', '3.second item', '3.third item']}
                  percentageAmount={'+200'}
                  mathsNum={'504232.545'}
                />
              </div>
            </section>
            <section className="container w-full mx-auto">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                  <CustomTableContainer
                    menu={true}
                    tableHeading={'Previous Transaction'}
                    tableHeaderText={tableHeaderText}
                    tableData={tableData}
                  />
                </div>

                <aside className="text-white">
                  <div className="container h-[40vh] md:h-[46vh] lg:h-[44vh] xl:h-[40vh] w-full mx-auto">
                    <div className="grid gap-4 grid-cols-2">
                      <CustomPlainCard
                        bg={'bg-blue-500'}
                        icon={
                          'https://images.vexels.com/media/users/3/185202/isolated/preview/04210f166dee214fc751791106b453b2-donut-pink-syrup-icon.png'
                        }
                        text={'add any text here'}
                        heading={'Heading'}
                      />

                      <CustomPlainCard
                        bg={'bg-yellow-500'}
                        icon={
                          'https://images.vexels.com/media/users/3/185202/isolated/preview/04210f166dee214fc751791106b453b2-donut-pink-syrup-icon.png'
                        }
                        text={'add any text here'}
                        heading={'Heading'}
                      />
                      <CustomPlainCard
                        bg={'bg-cyan-500'}
                        icon={
                          'https://images.vexels.com/media/users/3/185202/isolated/preview/04210f166dee214fc751791106b453b2-donut-pink-syrup-icon.png'
                        }
                        text={'add any text here'}
                        heading={'Heading'}
                      />
                      <CustomPlainCard
                        bg={'bg-red-500'}
                        icon={
                          'https://images.vexels.com/media/users/3/185202/isolated/preview/04210f166dee214fc751791106b453b2-donut-pink-syrup-icon.png'
                        }
                        text={'add any text here'}
                        heading={'Heading'}
                      />
                    </div>
                  </div>
                </aside>
              </div>
            </section>
            <section className="container w-full mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
              <div className="container w-full mx-auto grid gap-4 grid-cols-2">
                <InfoCard
                  title={'charge back'}
                  amount={'200,000'}
                  number={'2'}
                  type="danger"
                  icon={<TbCurrencyDollarOff size={32} />}
                />

                <InfoCard
                  title={'refund'}
                  amount={'200,000'}
                  type="warning"
                  icon={<TbAdjustmentsDollar size={32} />}
                />
              </div>
              <div>
                <CustomTableContainer
                  tableHeading={'Users'}
                  tableHeaderText={tableHeaderTextSec}
                  tableData={tableDataSec}
                />
              </div>
            </section>
          </main>
        </div>
      </div> */}
    </>
  );
};

export default Landingpage;
