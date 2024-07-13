import React, { useState } from 'react';
import CreditCardInput from 'react-credit-card-input';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateInvoice } from '../../../redux/invoiceSlice';
import useToast from '../../../hooks/useToast';
import { api } from '../../../services/api';

const Authorize = ({ invoiceData }) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const dispatch = useDispatch();

  const [name, setName] = useState(invoiceData?.clientName || '');
  const [addressLine1, setAddressLine1] = useState(invoiceData?.clientAddress || '');
  const [city, setCity] = useState(invoiceData?.clientCity || '');
  const [state, setState] = useState(invoiceData?.clientState || '');
  const [zip, setZip] = useState(invoiceData?.clientZip || '');
  const [phone, setPhone] = useState(invoiceData?.clientPhone || '');

  const [cardNumber, setCardNumber] = useState();
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState(invoiceData?.totalDue || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCardExpiryChange = (e) => {
    setExpiry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!name || !addressLine1 || !city || !state || !zip || !phone) {
    //   showErrorToast('All fields are required');
    //   return;
    // }
    if (!cardNumber || !expiry || !cvc) {
      setError('Card details are missing');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/v1/payments/authorizeNet/create-charge', {
        cardDetails: {
          number: Number(cardNumber),
          expiry: expiry.replace(' / ', ''),
          cvc: cvc,
          currencyCode: 'USD',
        },
        amount: amount,
      });

      if (response.data.success) {
        await dispatch(updateInvoice({ id: invoiceData._id, payload: { status: 'paid' } }));
        // showSuccessToast('Payment successful! Transaction ID: ' + response.data.transactionId);
        showSuccessToast('Invoice Paid Succesfully.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError(response.data.error || 'Payment failed');
      }
    } catch (error) {
      setError(`Payment error: ${error.response ? error.response.data.error : error.message}`);
    }
    setLoading(false);
  };

  return (
    <Flex
      p={10}
      sx={{
        boxShadow: `10px 10px 8px -6px rgba(0,0,0,0.75)`,
      }}
      gap={2}
      w={'400px'}
      bg={'#fcfafa'}
      flexDir={'column'}
    >
      <Text color={'#808080'} fontWeight={'700'} fontSize={22} textAlign={'center'}>
        Enter Your Card Details
      </Text>
      {/* <Box color={'#808080'} my={2} mx={0}>
        <Input
          w={'100%'}
          color={'#000'}
          border={'2px solid #808080'}
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box color={'#808080'} my={2} mx={0}>
        <Input
          w={'100%'}
          color={'#000'}
          border={'2px solid #808080'}
          type="text"
          name="addressLine1"
          placeholder="Enter Address"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
      </Box>
      <Box color={'#808080'} my={2} mx={0}>
        <Input
          w={'100%'}
          color={'#000'}
          border={'2px solid #808080'}
          type="text"
          name="city"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Box>
      <Box color={'#808080'} my={2} mx={0}>
        <Input
          w={'100%'}
          color={'#000'}
          border={'2px solid #808080'}
          type="text"
          name="state"
          placeholder="Enter State eg: WA, AL, TX ..."
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </Box>
      <Box color={'#808080'} my={2} mx={0}>
        <Input
          w={'100%'}
          color={'#000'}
          border={'2px solid #808080'}
          type="text"
          name="zip"
          placeholder="Enter Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </Box>
      <Box color={'#808080'} my={2} mx={0}>
        <Input
          w={'100%'}
          color={'#000'}
          border={'2px solid #808080'}
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Box> */}
      <Box my={2} border={'2px solid #808080'}>
        <CreditCardInput
          cardNumberInputProps={{
            value: cardNumber,
            onChange: (e) => setCardNumber(e.target.value),
          }}
          cardExpiryInputProps={{ value: expiry, onChange: handleCardExpiryChange }}
          cardCVCInputProps={{ value: cvc, onChange: (e) => setCvc(e.target.value) }}
          fieldClassName="input"
        />
      </Box>
      <Box color={'#808080'} my={2} mx={0}>
        <Input
          w={'100%'}
          color={'#000'}
          border={'2px solid #808080'}
          type="number"
          name="amount"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Box>
      {error && <Text color="red.500">{error}</Text>}
      <Flex my={2} justifyContent={'center'}>
        <Button
          isLoading={loading}
          bg={'#808080'}
          color={'#000'}
          disabled={!cardNumber || !expiry || !cvc}
          onClick={handleSubmit}
        >
          Pay Now
        </Button>
      </Flex>
    </Flex>
  );
};

export default Authorize;
