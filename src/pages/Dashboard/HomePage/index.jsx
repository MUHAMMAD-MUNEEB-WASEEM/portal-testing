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
import { Flex, Heading, Spinner, VStack } from '@chakra-ui/react';
import CustomViewCard from '../../../components/CustomViewCard/CustomViewCard';
import InfoCard from '../../../components/InfoCard/InfoCard';
import CustomTableContainer from '../../../components/CustomTableContainer/CustomTableContainer.js';
import { TbAdjustmentsDollar, TbCurrencyDollarOff } from 'react-icons/tb';
import CustomPlainCard from '../../../components/CustomPlainCard/CustomPlainCard';
import { useInvoiceContext } from '../../../hooks/useInvoiceContext.js';
import { useAuthContext } from '../../../hooks/useAuthContext.js';
import useApi from '../../../hooks/useApi.js';
import { get } from '../../../utils/fetch.js';
import icon1 from '../../../images/icon-1.png';
import icon2 from '../../../images/icon-2.png';
import icon3 from '../../../images/icon-3.png';
import icon4 from '../../../images/icon-4.png';
import Loading from '../../../components/Loader/index.jsx';
import ClientTable from '../../../components/ClientTable/ClientTable.js';

// this all static data for table and all data from api should be in this format
const tableHeaderText = ['email', 'date', 'amount', 'project/job', 'action']; // this is table static heading
// second table
const tableHeaderTextSec = ['client name', 'date joining', 'email', 'count']; // this is table static heading

const HomePage = () => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { error, loading, apiCall } = useApi();
  const { users, dispatch } = useInvoiceContext();
  const [invoice, setInvoice] = useState(null);
  const [invoiceResponse, setInvoiceResponse] = useState(null);
  const [client, setClient] = useState(null);

  const [filters, setFilters] = useState({
    page: 1,
    sort: '',
    limit: 10,
    search: '',
  });
  const [filterClient, setClientFilter] = useState({
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
        const clientApiCall = get(
          user?.data?.role.trim().toLowerCase() === 'admin' ? 'admin/client' : 'clients',
          filterClient,
        );
        const invoiceApiCall = get(
          user?.data?.role.trim().toLowerCase() === 'admin' ? 'admin/invoice' : 'invoices',
          filters,
        );

        // Execute both API calls concurrently
        const [clientResponse, invoiceResponse] = await Promise.all([
          clientApiCall,
          invoiceApiCall,
        ]);

        if (invoiceResponse) {
          setInvoiceResponse(invoiceResponse);
        }

        const invoiceDate = invoiceResponse.data.map((v) => {
          return {
            client: v.clientEmail,
            date: v.invoiceDate,
            email: v.totalDue,
            amount: 'project',
            project: v.status,
            // status: v.status,
          };
        });
        setInvoice(invoiceDate);
        setClient(clientResponse);
      } catch (error) {
        console.log('Fetch Error', error);
      }
    })();
  }, [user]);

  return (
    <VStack spacing="6" align="stretch" p="4">
      <Flex mb={6} justifyContent="space-between" alignItems="end">
        {/* <DashboardHeading>Dashboard</DashboardHeading> */}
        <h1 className="text-black text-3xl font-bold">Dashboard</h1>
      </Flex>
      <section className="w-full mx-auto grid gap-4 xs:grid-cols-1 sm:grid-cols-4 md:grid-cols-3">
        <div className="sm:col-span-2 md:col-span-1">
          <CustomViewCard
            headText={'Total Invoices'}
            menuItems={['fist item', 'second item', 'third item']}
            percentage={'+200'}
            amount={invoiceResponse?.totalVolume}
          />
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <CustomViewCard
            headText={'Total Invoices Paid'}
            menuItems={['2.fist item', '2.second item', '2.third item']}
            percentage={'-2.48'}
            amount={invoiceResponse?.paidVolume}
          />
        </div>
        <div className="sm:col-span-4 md:col-span-1">
          <CustomViewCard
            headText={'Total Invoices Unpaid'}
            menuItems={['3.fist item', '3.second item', '3.third item']}
            percentage={'+200'}
            amount={invoiceResponse?.unpaidVolume}
          />
        </div>
      </section>

      <section className="w-full mx-auto">
        <h1 className="text-black text-3xl font-bold mb-6">Transaction</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="md:col-span-2">
            {!loading ? (
              <>
                {invoice?.length && (
                  <CustomTableContainer
                    menu={true}
                    // tableHeading={'Previous Transaction'}
                    tableHeaderText={tableHeaderText}
                    tableData={invoice}
                    link={'/dashboard/invoices'}
                  />
                )}
              </>
            ) : (
              <>
                <Flex
                  className="h-full"
                  display={'flex'}
                  alignItems="center"
                  justifyContent={'center'}
                >
                  <Spinner
                    thickness="10px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Flex>
              </>
            )}
          </div>

          <aside className="text-white">
            <div className="lg:overflow-y-scroll xl:overflow-hidden w-full">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 lg:max-h-96 xl:max-h-auto">
                <CustomPlainCard
                  bg={'bg-blue-500'}
                  icon={icon1}
                  heading={invoiceResponse?.totalInvoices}
                  text={'Total invoices'}
                />
                <CustomPlainCard
                  bg={'bg-yellow-500'}
                  icon={icon2}
                  heading={invoiceResponse?.paidInvoices}
                  text={'paid invoices'}
                />
                <CustomPlainCard
                  bg={'bg-cyan-500'}
                  icon={icon3}
                  heading={invoiceResponse?.unpaidInvoices}
                  text={'unpaid invoices'}
                />
                <CustomPlainCard
                  bg={'bg-red-500'}
                  icon={icon4}
                  heading={invoiceResponse?.unpaidInvoices}
                  text={'invoices sent'}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
      <h1 className="text-black text-3xl font-bold">Charge/Refund</h1>
      <section className="w-full mx-auto grid grid-cols-2 gap-4">
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
      </section>

      <h1 className="text-black text-3xl font-bold">Client</h1>
      {client && (
        <ClientTable
          tableHeading={'Users'}
          tableHeaderText={tableHeaderTextSec}
          tableData={client?.data}
          link={'/dashboard/clients'}
        />
      )}
    </VStack>
  );
};

export default HomePage;
