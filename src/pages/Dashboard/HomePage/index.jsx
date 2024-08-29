// import styles from './HomePage.module.css';
// // import Circle from '../../../images/Circle.png';
// // import ringImage from '../../../images/Masking.png';
// // import outcome from '../../../images/outcome.png';
// import { useLocation } from 'react-router-dom';

// import { useEffect } from 'react';
// import { Flex, VStack } from '@chakra-ui/react';

// const HomePage = () => {
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === '/dashboard/main') {
//       localStorage.setItem('ActiveText', 'Dashboard');
//     }
//   }, []);

//   return (
//     <VStack spacing="6" align="stretch" p="4">
//       <Flex mb={6} justifyContent="space-between" alignItems="end">
//       </Flex>
//       <div className={styles.leisure}>
//         <div className={styles.balance}>
//           <div className={styles.top}>
//             <span>Balance</span>
//             {/* <img src={Circle} alt="" /> */}
//           </div>
//           <div className={styles.balanceCount}></div>
//           <div className={styles.bottom}>
//             <div className={styles.validation}>
//               <span>Valid Thru</span>
//               <span>03/21</span>
//             </div>
//             <div className={styles.cardNumber}>
//               <span>.... .... .... 1234</span>
//             </div>
//           </div>

//           {/* Absolute balance ring image */}
//           <div className={styles.maskingImage}>{/* <img src={ringImage} alt="" /> */}</div>
//         </div>

//         {/* ************Balance income********* */}
//         <div className={styles.income}>
//           <div className={styles.top}>
//             <span>Income</span>
//           </div>
//           <div className={styles.balanceCount}></div>

//           <div className={styles.incomeChart}></div>
//         </div>

//         <div className={styles.outcome}>
//           <div className={styles.top}>
//             <span>Total</span>
//             {/* <img src={outcome} alt="" /> */}
//           </div>
//           <div className={styles.balanceCount}>{/* $00.00 */}</div>
//         </div>
//       </div>
//       <div className={styles.container}>
//         {/* transaction overview section */}

//         <div className={styles.transactionOverview}>
//           <h1>Weekly Transaction Overview</h1>
//         </div>
//         <div className={styles.transactionOverview}>
//           <h1>Monthly Transaction Overview</h1>
//           <div className={styles.barchart}></div>
//         </div>
//       </div>
//       {/************Third invoice and transction details section************/}
//       <div className={styles.transactionContainer}>
//         <div className={styles.first}>
//           <div className={styles.top}>
//             <span style={{ fontSize: '1.2rem' }}>Latest Invoice</span>
//           </div>
//         </div>

//         <div className={styles.invoiceHistory}>
//           <div className={styles.top}>
//             <span style={{ fontSize: '1.2rem' }}>Recent Clients</span>
//           </div>
//         </div>
//       </div>
//     </VStack>
//   );
// };

// export default HomePage;

import styles from './HomePage.module.css';
// import Circle from '../../../images/Circle.png';
// import ringImage from '../../../images/Masking.png';
// import outcome from '../../../images/outcome.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import CustomViewCard from '../../../components/CustomViewCard/CustomViewCard';
import InfoCard from '../../../components/InfoCard/InfoCard';
import CustomTableContainer from '../../../components/CustomTableContainer/CustomTableContainer.js';
import { TbAdjustmentsDollar, TbCurrencyDollarOff } from 'react-icons/tb';
import CustomPlainCard from '../../../components/CustomPlainCard/CustomPlainCard';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext.js';
import { useAuthContext } from '../../../hooks/useAuthContext.js';
import useApi from '../../../hooks/useApi.js';
import { get } from '../../../utils/fetch.js';
import icon1 from '../../../images/icon-1.png'
import icon2 from '../../../images/icon-2.png'
import icon3 from '../../../images/icon-3.png'
import icon4 from '../../../images/icon-4.png'
// this all static data for table and all data from api should be in this format

const tableHeaderText = ['email', 'date', 'amount', 'project/job', 'action']; // this is table static heading
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
// const tableDataSec = [
//   {
//     client: 'neymar jr',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
//   {
//     client: 'CR7',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
//   {
//     client: 'mbappe ',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
//   {
//     client: 'jhon smith',
//     date: 'DD MM YYYY',
//     email: 'example@gmail.com',
//     amount: '+923252105103',
//   },
// ]; // this is table static data

const HomePage = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { error, loading, apiCall } = useApi();
  const { users, dispatch } = useInvoiceContext();
  const [invoice, setInvoice] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    sort: '',
    limit: 10,
    search: '',
  });

  useEffect(() => {
    if (location.pathname === '/dashboard/main') {
      localStorage.setItem('ActiveText', 'Dashboard');
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // Define the API calls
        const userApiCall = apiCall('/api/v1/admin/user');
        const invoiceApiCall = get('admin/invoice', filters);

        // Execute both API calls concurrently
        const [userResponse, invoiceResponse] = await Promise.all([userApiCall, invoiceApiCall]);

        
        const invoiceDate = invoiceResponse.data.map((v) => {
          return {
            client: v.clientEmail,
            date: v.invoiceDate,
            email: v.totalDue,
            amount: 'project',
            project: v.status,
            // status: v.status,
          };
        })
        setInvoice(invoiceDate);

        if (userResponse) {
          dispatch({
            type: 'GET_USERS',
            payload: userResponse?.data,
          });
        }
      } catch (error) {
        console.log('Fetch Error', error);
      }
    })();
  }, [user]);

  // sort data for user table
  const userTableData =
    users?.length &&
    users?.map((elem) => {
      return {
        client: elem.name,
        date: new Date(elem.createdAt).toDateString(),
        email: elem.email,
        amount: elem.pkNumber,
      };
    });

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex mb={6} justifyContent="space-between" alignItems="end">
        {/* <DashboardHeading>Dashboard</DashboardHeading> */}
        <h1 className="text-black text-3xl font-bold">Dashboard</h1>
      </Flex>
      <section className="w-full mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-4 md:grid-cols-3">
        <div className="sm:col-span-2 md:col-span-1">
          <CustomViewCard
            headText={'total volume'}
            menuItems={['fist item', 'second item', 'third item']}
            percentage={'+200'}
            amount={'8025345.4232'}
          />
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <CustomViewCard
            headText={'total transaction'}
            menuItems={['2.fist item', '2.second item', '2.third item']}
            percentage={'-2.48'}
            amount={'500'}
          />
        </div>
        <div className="sm:col-span-4 md:col-span-1">
          <CustomViewCard
            headText={'payable amount'}
            menuItems={['3.fist item', '3.second item', '3.third item']}
            percentage={'+200'}
            amount={'504232.545'}
          />
        </div>
      </section>

      <section className="w-full mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            {invoice?.length && (<CustomTableContainer
              menu={true}
              tableHeading={'Previous Transaction'}
              tableHeaderText={tableHeaderText}
              tableData={invoice}
              link={'/dashboard/invoices'}
            />)}
          </div>

          <aside className="text-white">
            <div className="md:h-[46vh] lg:h-[44vh] xl:h-[40vh] overflow-y-scroll w-full">
              <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                <CustomPlainCard
                  bg={'bg-blue-500'}
                  icon={icon1}
                  heading={'1245'}
                  text={'Total invoices'}
                />
                <CustomPlainCard
                  bg={'bg-yellow-500'}
                  icon={icon2}
                  heading={'1245'}
                  text={'paid invoices'}
                />
                <CustomPlainCard
                  bg={'bg-cyan-500'}
                  icon={icon3}
                  heading={'1245'}
                  text={'unpaid invoices'}
                />
                <CustomPlainCard
                  bg={'bg-red-500'}
                  icon={icon4}
                  heading={'1245'}
                  text={'Total invoices sent'}
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
            tableData={userTableData}
            link={'/dashboard/clients'}
          />
        </div>
      </section>
    </VStack>
  );
};

export default HomePage;
