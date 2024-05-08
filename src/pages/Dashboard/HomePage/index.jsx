import styles from './HomePage.module.css';
// import Circle from '../../../images/Circle.png';
// import ringImage from '../../../images/Masking.png';
// import outcome from '../../../images/outcome.png';
import { useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import DashboardHeading from '../../../components/DashboardHeading';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard/main') {
      localStorage.setItem('ActiveText', 'Dashboard');
    }
  }, []);

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex mb={6} justifyContent="space-between" alignItems="end">
        <DashboardHeading>Dashboard</DashboardHeading>
      </Flex>
      <div className={styles.leisure}>
        <div className={styles.balance}>
          <div className={styles.top}>
            <span>Balance</span>
            {/* <img src={Circle} alt="" /> */}
          </div>
          <div className={styles.balanceCount}></div>
          <div className={styles.bottom}>
            <div className={styles.validation}>
              <span>Valid Thru</span>
              <span>03/21</span>
            </div>
            <div className={styles.cardNumber}>
              <span>.... .... .... 1234</span>
            </div>
          </div>

          {/* Absolute balance ring image */}
          <div className={styles.maskingImage}>{/* <img src={ringImage} alt="" /> */}</div>
        </div>

        {/* ************Balance income********* */}
        <div className={styles.income}>
          <div className={styles.top}>
            <span>Income</span>
          </div>
          <div className={styles.balanceCount}></div>

          <div className={styles.incomeChart}></div>
        </div>

        <div className={styles.outcome}>
          <div className={styles.top}>
            <span>Total</span>
            {/* <img src={outcome} alt="" /> */}
          </div>
          <div className={styles.balanceCount}>{/* $00.00 */}</div>
        </div>
      </div>
      <div className={styles.container}>
        {/* transaction overview section */}

        <div className={styles.transactionOverview}>
          <h1>Weekly Transaction Overview</h1>
        </div>
        <div className={styles.transactionOverview}>
          <h1>Monthly Transaction Overview</h1>
          <div className={styles.barchart}></div>
        </div>
      </div>
      {/************Third invoice and transction details section************/}
      <div className={styles.transactionContainer}>
        <div className={styles.first}>
          <div className={styles.top}>
            <span style={{ fontSize: '1.2rem' }}>Latest Invoice</span>
          </div>
        </div>

        <div className={styles.invoiceHistory}>
          <div className={styles.top}>
            <span style={{ fontSize: '1.2rem' }}>Recent Clients</span>
          </div>
        </div>
      </div>
    </VStack>
  );
};

export default HomePage;
