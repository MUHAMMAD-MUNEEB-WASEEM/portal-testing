import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './index.module.css';
import { api } from '../../services/api';
import CurrencyFormatter from '../../utils/currencyFormatter';
import { InvizLogo } from '../../images';
import Select from 'react-select';
import Stripe from './Stripe/index';
import PaypalFinitive from './PaypalFinitive';
import PaypalAxolot from './PaypalAxolot';
import PayArc from './PayArc';
import Sumup from './Sumup';
import { useDispatch, useSelector } from 'react-redux';
import { getOneInvoice } from '../../redux/invoiceSlice';
import { Box, Flex, Heading, Image, Text, VStack, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import Authorize from './Authorize';

const ClientInvoice = () => {
  const { id } = useParams();
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.singleInvoice);
  const [isDateGreaterThanTarget, setIsDateGreaterThanTarget] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const fetchGeolocationData = async () => {
      try {
        // const response = await axios.get(`https://ipinfo.io/json?token=de16debdbfca16`);
        // const data = response.data;
        // if (data.country === 'PK') {
        //   setIsBlocked(true);
        // }
      } catch (error) {
        console.error('Error fetching geolocation data:', error);
      }
    };

    fetchGeolocationData();
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getOneInvoice({ id }));
    }
    if (colorMode === 'dark') {
      toggleColorMode();
    }
  }, [dispatch, id]);

  useEffect(() => {
    console.log(invoice);
    if (!!invoice) {
      document.title = invoice?.brandName;
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = invoice?.logo;
    }
  }, [invoice]);

  useEffect(() => {
    if (invoice?.invoiceDueDate) {
      const targetDate = new Date(invoice?.invoiceDueDate);
      const currentDate = new Date();

      setIsDateGreaterThanTarget(currentDate > targetDate);
    }
  }, [invoice?.invoiceDueDate]);

  if (isBlocked) {
    return <div>Access denied</div>;
  }

  console.log('invoice?.mercahnt', invoice?.merchant === 'MA-ZP');

  return (
    <Box as="div" my={20}>
      {!!invoice && (
        <Box
          mx={'auto'}
          boxShadow={'2px 5px 5px #808080'}
          border={'1px solid #808080'}
          as="div"
          // maxHeight={'1400px'}
          bg={!!invoice?.invoiceBgColor ? invoice?.invoiceBgColor : 'white'}
          height={'min-content'}
          maxWidth={'900'}
          fontFamily={'Poppins'}
          pt={12}
          pb={5}
          px={4}
        >
          <Box color={'black'} as="div" zIndex={10}>
            <Box
              as="div"
              style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              height={'8'}
              maxWidth={'900'}
              bg={
                invoice?.status == 'paid'
                  ? 'green'
                  : invoice?.status == 'unpaid' && isDateGreaterThanTarget
                    ? '#FDAE49'
                    : invoice?.status == 'unpaid' && 'red'
              }
              mb={4}
              px={4}
            >
              <Heading as={'h4'} fontSize={'18'} style={{ color: '#000', textAlign: 'center' }}>
                {invoice?.status == 'paid'
                  ? 'Paid'
                  : invoice?.status == 'unpaid' && isDateGreaterThanTarget
                    ? 'Due'
                    : invoice?.status == 'unpaid' && 'Unpaid'}
              </Heading>
            </Box>
            <Flex justifyContent={'space-between'}>
              <VStack spacing={6} flex={'0.5'} align={'self-start'}>
                <Image width={'200px'} objectFit={'contain'} src={invoice?.logo} />
                <Box>
                  <Heading as={'h4'} fontSize={'22'}>
                    {invoice?.brandName}
                  </Heading>
                  <Text> {invoice?.brandAddress}</Text>
                  <Text> {invoice?.brandCity}</Text>
                  <Text> {invoice?.brandState}</Text>
                  <Text> {invoice?.brandZip}</Text>
                  <Text> {invoice?.brandCountry}</Text>
                </Box>

                <Box my={10}>
                  <Box>
                    <Heading as={'h4'} fontSize={'22'}>
                      Bill To
                    </Heading>
                    {invoice?.clientBusinessName && (
                      <Text> {`${invoice?.clientBusinessName}`}</Text>
                    )}
                    {invoice?.clientName && <Text> {`${invoice?.clientName} `}</Text>}
                    {invoice?.clientAddress && <Text> {invoice?.clientAddress}</Text>}
                    {invoice?.clientCity && <Text> {invoice?.clientCity}</Text>}
                    {invoice?.clientCountry && <Text> {invoice?.clientCountry}</Text>}
                    {invoice?.clientZip && <Text> {invoice?.clientZip}</Text>}
                  </Box>
                </Box>
              </VStack>
              <Flex
                spacing={6}
                flex={'0.5'}
                flexDir={'column'}
                justifyContent={'space-between'}
                align={'self-end'}
                pt={14}
              >
                <Box as="div">
                  <Heading textAlign={'end'} as="h2" fontWeight={'600'} fontSize={26}>
                    Invoice
                  </Heading>
                  <Text>{`${invoice?.invoiceNumber}`}</Text>

                  <Box as="div" mt={20}>
                    <Heading textAlign={'end'} as="h2" fontWeight={'600'} fontSize={20}>
                      {invoice?.status === 'paid' ? 'Amount Paid' : 'Balance Due'}
                    </Heading>
                    <Text textAlign={'end'}>{`${invoice?.currency} ${invoice?.totalDue}`}</Text>
                  </Box>
                </Box>
                <Flex w={'100%'} my={10} flexDir={'column'} gap={2}>
                  <Flex flex={1} gap={2} alignItems={'baseline'}>
                    <Text flex={0.3}>Date</Text>
                    <Text flex={0.7}>{invoice?.invoiceDate}</Text>
                  </Flex>
                  <Flex gap={2} alignItems={'baseline'}>
                    <Text flex={0.3}>Due Date</Text>
                    <Text flex={0.7}>{invoice?.invoiceDueDate}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Box as="div">
              <Flex px={2} borderTopRadius={4} flex={1} bg="#666">
                <Box flex={0.5}>
                  <Text textAlign={'start'}>Item Description</Text>
                </Box>
                <Box flex={0.1}>
                  <Text textAlign={'start'}>Qty</Text>
                </Box>
                <Box flex={0.15}>
                  <Text>Rate</Text>
                </Box>
                <Box flex={0.15}>
                  <Text>Amount</Text>
                </Box>
              </Flex>
              {invoice?.productLines?.map((productLine, i) => (
                <Flex alignItems={'flex-start'} key={i} flex={1}>
                  {/* <Box bg={invoice?.invoiceBgColor ?? 'white'} flex={0.5} py={4} px={2} pb={2}>
                    <Text>{`${productLine?.description}`}</Text>
                  </Box> */}
                  <Box
                    className="richTextEditor"
                    bg={invoice?.invoiceBgColor ?? 'white'}
                    flex={0.5}
                    py={4}
                    px={2}
                    pb={2}
                  >
                    {/* <Text>{`${productLine?.description}`}</Text> */}
                    <Box
                      as="div"
                      color={'black'}
                      dangerouslySetInnerHTML={{ __html: productLine?.description }}
                    ></Box>
                  </Box>
                  <Box as="div" flex={0.1} py={4} px={2} pb={2}>
                    <Text>{`${productLine?.quantity}`}</Text>
                  </Box>
                  <Box as="div" flex={0.15} py={4} px={2} pb={2}>
                    <Text>{productLine?.rate}</Text>
                  </Box>
                  <Box as="div" flex={0.15} py={4} px={2} pb={2}>
                    <Text>{`${productLine?.quantity * productLine?.rate}`}</Text>
                  </Box>
                </Flex>
              ))}

              <Flex flex={1} justifyContent={'flex-end'}>
                <Flex flexDir={'column'}>
                  <Flex justifyContent={'space-between'} gap={10}>
                    <Text>Subtotal</Text>
                    <Text
                      textAlign={'end'}
                      justifySelf={'flex-end'}
                    >{`${invoice?.currency} ${invoice?.subTotal}`}</Text>
                  </Flex>
                  <Flex justifyContent={'space-between'} alignItems={'baseline'} gap={10}>
                    <Text>Tax</Text>
                    <Flex alignItems={'baseline'} mr={10}>
                      <Text textAlign={'end'} justifySelf={'flex-end'}>
                        {invoice?.taxPercent}%
                      </Text>
                    </Flex>
                    <Text>{`${invoice?.currency} ${invoice?.taxAmount}`}</Text>
                  </Flex>

                  <Box border={'1px solid #808080'} my={4} />
                  <Flex justifyContent={'space-between'} gap={10}>
                    <Text>Total</Text>
                    <Text
                      textAlign={'end'}
                      justifySelf={'flex-end'}
                    >{`${invoice?.currency} ${invoice?.totalDue}`}</Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex my={2} gap={2}>
                <Text>Terms and Conditions</Text>
                <Text>{invoice?.terms}</Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      )}

      <Flex justifyContent={'center'} my={20}>
        {invoice?.merchant === ('PA-DC' || 'Merchant 1') ? (
          <PayArc invoiceData={invoice} />
        ) : (
          invoice?.merchant == ('MA-ZP' || 'Merchant 2') && <Authorize invoiceData={invoice} />
        )}
      </Flex>
      <Flex justifyContent={'center'} my={20}>
        {invoice?.merchant === 'Paypal Finitive' && <PaypalFinitive invoice={invoice} />}
      </Flex>
    </Box>
  );
};

export default ClientInvoice;
