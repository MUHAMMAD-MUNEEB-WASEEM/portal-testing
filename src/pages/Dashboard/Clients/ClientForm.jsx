import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeading from '../../../components/DashboardHeading';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../../redux/brandSlice';
import useToast from '../../../hooks/useToast';
import CONSTANTS from '../../../utils/constants';
import usePermissionCheck from '../../../hooks/usePermissionCheck';
import { getOneClient } from '../../../redux/clientSlice/actions';
import { addClient, updateClient } from '../../../redux/clientSlice';
import countries from '../../../utils/countryData';
import { renderCheckboxes } from '../../../utils/helpers';
import { getUserMerchants } from '../../../redux/merchantSlice';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showErrorToast, showSuccessToast } = useToast();
  const client = useSelector((state) => state.client.singleClient);
  const brands = useSelector((state) => state.brand.brands);
  const merchants = useSelector((state) => state.merchant.merchants);
  const { isCreateAllowed, isReadAllowed, isUpdateAllowed, isDeleteAllowed, user } =
    usePermissionCheck(CONSTANTS.modules.CLIENTS);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    website: '',
    phone: '',
    country: '',
    countryCode: '',
    clientEmail: '',
    additionalEmails: [],
    brand: null,
    merchant: null,
    image: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneClient({ id: id }));
      dispatch(getBrands());
    }

    dispatch(getBrands());
    dispatch(getUserMerchants());
  }, [dispatch, id]);

  useEffect(() => {
    setFormValues({ ...formValues, ...client });
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!id) {
      dispatch(addClient({ payload: formValues }))
        .then((action) => {
          if (addClient.fulfilled.match(action)) {
            if (action.payload) {
              showSuccessToast('Client Added Succesfully.');
              navigate(-1);
              return;
            } else {
              showErrorToast('Failed to Add Client.');
            }
          } else {
            showErrorToast('Failed to Add!');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          showErrorToast(error?.message);
        });
    } else if (id) {
      dispatch(updateClient({ id: id, payload: formValues }))
        .then((response) => {
          showSuccessToast('Client Updated Succesfully.');
          navigate(-1);
        })
        .catch((error) => {
          console.error('Error:', error);
          showErrorToast(error?.message);
        });
    }
  };

  const handleMerchantChange = (e) => {
    setFormValues({ ...formValues, merchant: e.target.value });
  };

  return (
    <VStack spacing="6" align="stretch" p="4">
      <form onSubmit={formHandler}>
        <Flex mb={6} justifyContent="space-between" alignItems="end">
          <DashboardHeading>{!!id ? 'Update Client' : 'Add New Client'}</DashboardHeading>
          <Flex gap={4} alignItems={'end'}>
            {!!id ? (
              <Button type="submit" bg="brand.secondary" color="brand.text">
                Update
              </Button>
            ) : (
              <Button type="submit" bg="brand.secondary" color="brand.text">
                Add
              </Button>
            )}
          </Flex>
        </Flex>

        <Flex flexWrap={'wrap'} p="10" borderRadius={10} bg={'brand.primary'}>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>FirstName *</FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter First Name."
                name="firstName"
                onChange={handleChange}
                value={formValues.firstName}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Last Name * </FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Last Name."
                name="lastName"
                onChange={handleChange}
                value={formValues.lastName}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Email * </FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Clients Email."
                name="clientEmail"
                onChange={handleChange}
                value={formValues.clientEmail}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Phone * </FormLabel>
              <Input
                required
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Clients Phone."
                name="phone"
                onChange={handleChange}
                value={formValues.phone}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Business Name *</FormLabel>
              <Input
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter Business name"
                name="businessName"
                onChange={handleChange}
                value={formValues.businessName}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>St Address </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter  Address."
                name="address"
                onChange={handleChange}
                value={formValues.address}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>City </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter City ."
                name="city"
                onChange={handleChange}
                value={formValues.city}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>State </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="text"
                placeholder="Enter State ."
                name="state"
                onChange={handleChange}
                value={formValues.state}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Zip </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="number"
                placeholder="Zip Code."
                name="zip"
                onChange={handleChange}
                value={formValues.zip}
              />
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Country</FormLabel>
              <Select
                size={'lg'}
                color={'brand.secondary'}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    country: e.target.value.split('/')[0],
                    countryCode: e.target.value.split('/')[1],
                  });
                }}
              >
                <option selected hidden disabled value="">
                  {!!id && !!client?.country ? client?.country : 'Select a Country'}
                </option>
                {countries?.map((e, i) => (
                  <option key={i} value={`${e?.name}/${e?.code}`}>
                    {e?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Website </FormLabel>
              <Input
                border={'1px solid #808080'}
                type="url"
                placeholder="Website."
                name="website"
                onChange={handleChange}
                value={formValues.website}
              />
            </FormControl>
          </Box>

          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Brand</FormLabel>
              <Select
                color={'brand.secondary'}
                size={'lg'}
                onChange={(e) => {
                  setFormValues({ ...formValues, brand: e.target.value });
                }}
              >
                <option selected hidden disabled value="">
                  {!!id && !!client?.brand?.name ? client?.brand?.name : 'Select a Brand'}
                </option>
                {brands?.map((e, i) => (
                  <option key={i} value={e?._id}>
                    {e?.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box w="45%" mr="30px">
            <FormControl my="10px">
              <FormLabel color={'brand.secondary'}>Merchant</FormLabel>
              <HStack>
                {merchants?.map((merchant, i) => (
                  <Checkbox
                    onChange={(e) => handleMerchantChange(e)}
                    isChecked={merchant._id === formValues.merchant}
                    key={i}
                    value={merchant._id}
                  >
                    {merchant?.name}
                  </Checkbox>
                ))}
              </HStack>
            </FormControl>
          </Box>
        </Flex>
      </form>
    </VStack>
  );
};

export default ClientForm;

// import React, { useEffect, useState } from 'react';

// import imageIcon from '../../../../images/imgUpload.png';
// import { useAuthContext } from '../../../../hooks/useAuthContext';
// import { api } from '../../../../services/api';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import { ReactMultiEmail, isEmail } from 'react-multi-email';
// import countries from '../../../../utils/countryData';
// import { useCallback } from 'react';
// import { useInvoiceContext } from '../../../../hooks/useInvoiceContext';
// import OptionSelector from '../../../../components/OptionSelector/OptionSelector';
// import { renderCheckboxes } from '../../../../utils/helpers';

// const ClientForm = () => {
//   const { merchants, brands, dispatch } = useInvoiceContext();
//   const { user } = useAuthContext();

//   const [selectedFile, setSelectedFile] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [query, setQuery] = useState('');
//   const [brandId, setBrandId] = useState(null);
//   const [selectedMerchant, setSelectedMerchant] = useState('');

//   const navigate = useNavigate();

//   const [createClient, setCreateClient] = useState({
//     firstName: '',
//     lastName: '',
//     businessName: '',
//     address: '',
//     city: '',
//     zip: '',
//     website: '',
//     phone: '',
//     country: '',
//     countryCode: '',
//     clientEmail: '',
//     additionalEmails: [],
//   });

//   const fetchItems = useCallback(
//     async (url, dispatchType) => {
//       try {
//         const { data } = await api.get(url, {
//           headers: {
//             Authorization: `Bearer ${user?.data?.token}`,
//           },
//         });
//         if (data) {
//           dispatch({
//             type: dispatchType,
//             payload: data?.data,
//           });
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     },
//     [user, dispatch],
//   );

//   useEffect(() => {
//     if (createClient.additionalEmails.length > 5) {
//       setCreateClient({
//         ...createClient,
//         additionalEmails: createClient.additionalEmails.slice(0, 5),
//       });
//     }
//   }, [createClient.additionalEmails, createClient]);

//   const handleFile = (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       alert('Please select a File to upload!');
//       return;
//     }

//     transformFile(file);
//   };

//   const transformFile = (file) => {
//     const reader = new FileReader();
//     if (file) {
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setSelectedFile(reader.result);
//       };
//     } else {
//       setSelectedFile('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...createClient,
//       image: selectedFile,
//       brand: brandId,
//       merchant: selectedMerchant,
//     };
//     setIsLoading(true);
//     setError(null);
//     try {
//       const { data } = await api.post('/api/v1/clients', payload, {
//         headers: { Authorization: `Bearer ${user?.data?.token}` },
//       });
//       if (data) {
//         setIsLoading(false);
//         setError(null);
//         showToastMessage('Client Created Successfully!');
//         localStorage.setItem('client_id', data?.data?._id);
//       }
//       resetForm();
//       setTimeout(() => {
//         navigate('/dashboard/clients');
//       }, 3000);
//     } catch (error) {
//       setIsLoading(false);
//       setError(error?.response?.data.message);
//     }
//   };

//   const resetForm = () => {
//     setSelectedFile('');
//     setCreateClient({
//       firstName: '',
//       lastName: '',
//       businessName: '',
//       address: '',
//       city: '',
//       zip: '',
//       website: '',
//       phone: '',
//       country: '',
//       clientEmail: '',
//       additionalEmails: [],
//     });
//   };

//   const showToastMessage = (message) => {
//     toast.success(message, {
//       position: toast.POSITION.TOP_RIGHT,
//       className: 'toast-success-message',
//     });
//   };

//   const handleCountryDropdown = (country) => {
//     setIsOpen(false);
//     setSelectedCountry(country.name);
//     setCreateClient({
//       ...createClient,
//       country: country.name,
//       countryCode: country.code,
//     });
//   };

//   const handleCheckboxChange = (_id) => {
//     setSelectedMerchant(_id);
//   };

//   useEffect(() => {
//     fetchItems('/api/v1/brands', 'GET_BRANDS');
//     fetchItems('/api/v1/users/merchants', 'GET_MERCHANTS');
//   }, [fetchItems]);

//   return (
//     <div className={classes.container}>
//       <div className={classes.top}>
//         <h1>Add New Clients</h1>
//       </div>

//       {/* {/ create client form /} */}
//       <div className={classes.form__container}>
//         <form className={classes.form__control} onSubmit={handleSubmit}>
//           <div className={classes.uploadImage}>
//             <span style={{ fontSize: '13px', marginBottom: '10px' }}>Upload Image</span>

//             <div className={classes.client__image}>
//               <div className={classes.imageInput}>
//                 <img src={imageIcon} alt="" />
//                 <div className={classes.signatureSpan}>Client Image</div>
//                 <div className={classes.sizeSpan}>Recommend Size (1920 x 1080) example</div>
//                 <label htmlFor="inputTag">
//                   <span style={{ cursor: 'pointer' }}>Browse</span>
//                   <input
//                     id="inputTag"
//                     type="file"
//                     style={{ display: 'none' }}
//                     onChange={(e) => handleFile(e)}
//                   />
//                 </label>
//               </div>
//               <div className={classes.imgPreview}>
//                 {selectedFile ? (
//                   <img src={selectedFile} alt="" className={classes.image} />
//                 ) : (
//                   <span>Preview Image</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className={classes.inputContainer}>
//             <label>
//               <span>First Name * </span>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 value={createClient.firstName}
//                 onChange={(e) =>
//                   setCreateClient({
//                     ...createClient,
//                     firstName: e.target.value,
//                   })
//                 }
//               />
//             </label>
//             <label>
//               <span>Last Name *</span>
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 value={createClient.lastName}
//                 onChange={(e) => setCreateClient({ ...createClient, lastName: e.target.value })}
//               />
//             </label>
//           </div>

//           <div className={classes.inputContainer}>
//             <label>
//               <span>Business Name *</span>
//               <input
//                 type="text"
//                 placeholder="Business Name"
//                 value={createClient.businessName}
//                 onChange={(e) =>
//                   setCreateClient({
//                     ...createClient,
//                     businessName: e.target.value,
//                   })
//                 }
//               />
//             </label>

//             <label>
//               <span>Address *</span>
//               <input
//                 type="text"
//                 placeholder="Client Address"
//                 value={createClient.address}
//                 onChange={(e) => setCreateClient({ ...createClient, address: e.target.value })}
//               />
//             </label>
//           </div>

//           <div className={classes.inputContainer}>
//             <label>
//               <div>
//                 <span>City</span>
//               </div>
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={createClient.city}
//                 onChange={(e) =>
//                   setCreateClient({
//                     ...createClient,
//                     city: e.target.value,
//                   })
//                 }
//               />
//             </label>

//             <label>
//               <div>
//                 <span>Zip</span>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Zip"
//                 value={createClient.zip}
//                 onChange={(e) => setCreateClient({ ...createClient, zip: e.target.value })}
//               />
//             </label>
//           </div>

//           <div className={classes.inputContainer}>
//             <label>
//               <span>Email *</span>
//               <input
//                 type="email"
//                 placeholder="Client's Email"
//                 value={createClient.clientEmail}
//                 onChange={(e) =>
//                   setCreateClient({
//                     ...createClient,
//                     clientEmail: e.target.value,
//                   })
//                 }
//               />
//             </label>

//             <label>
//               <span>Phone *</span>
//               <input
//                 type="Number"
//                 placeholder="Enter Phone Number"
//                 value={createClient.phone}
//                 onChange={(e) => setCreateClient({ ...createClient, phone: e.target.value })}
//               />
//             </label>
//           </div>

//           <div className={classes.inputContainer}>
//             <label>
//               <span>Website </span>
//               <input
//                 type="text"
//                 placeholder="Enter Website"
//                 value={createClient.website}
//                 onChange={(e) => setCreateClient({ ...createClient, website: e.target.value })}
//               />
//             </label>
//             <label>
//               <span>Select Country *</span>
//               <input
//                 className={classes.dropdownHeader}
//                 placeholder="Select Country"
//                 value={selectedCountry ? selectedCountry : query}
//                 onChange={(e) => {
//                   setSelectedCountry(null);
//                   setQuery(e.target.value);
//                   setIsOpen(true);
//                 }}
//                 onClick={() => setIsOpen(!isOpen)}
//               />
//             </label>
//           </div>

//           <div className={classes.inputContainer}>
//             <label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 <span>Additional Emails </span>
//               </div>
//               <ReactMultiEmail
//                 className={classes.MultiEmail}
//                 placeholder="Additional Emails "
//                 value={createClient}
//                 validateEmail={(email) => {
//                   return isEmail(email);
//                 }}
//                 onChange={(email) => setCreateClient({ ...createClient, additionalEmails: email })}
//                 // onFocus={() => setFocused(true)}
//                 // onBlur={() => setFocused(false)}
//                 getLabel={(email, i, removeEmail) => {
//                   return (
//                     <div key={i}>
//                       {i <= 4 ? (
//                         <div
//                           style={{
//                             border: ' 2px solid #1B9DE4',
//                             borderRadius: '15px',
//                           }}
//                           data-tag
//                         >
//                           <div data-tag-item>{email}</div>
//                           <span
//                             style={{
//                               color: '#1B9DE4',
//                               marginLeft: '6px',
//                               fontSize: '16px',
//                             }}
//                             className={classes.multiInput}
//                             data-tag-handle
//                             onClick={() => removeEmail(i)}
//                           >
//                             x
//                           </span>
//                         </div>
//                       ) : (
//                         ''
//                       )}
//                     </div>
//                   );
//                 }}
//               />
//             </label>
//             <label>
//               {isOpen && (
//                 <div className={classes.dropdownListContainer}>
//                   <ul className={classes.dropdownList}>
//                     {countries
//                       ?.filter((country) =>
//                         country?.name.toLowerCase().includes(query.toLowerCase()),
//                       )
//                       .map((country) => (
//                         <li
//                           onClick={() => handleCountryDropdown(country)}
//                           className={classes.dropdownListItem}
//                           key={country.code}
//                         >
//                           {country?.name}
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               )}
//             </label>
//           </div>

//           <div className={classes.inputContainer}>
//             <label>
//               <div>Select Brand *</div>
//               <select
//                 className={classes.BUH_selection}
//                 onChange={(e) => setBrandId(e.target.value)}
//               >
//                 <option selected style={{ display: 'none', color: 'black' }}>
//                   Select a Brand
//                 </option>
//                 {brands?.map((el, i) => (
//                   <OptionSelector key={i} item={el} />
//                 ))}
//               </select>
//             </label>
//           </div>

//           <div className={classes.checkboxContainer}>
//             <h4>Choose a Merchants</h4>
//             {renderCheckboxes(merchants, selectedMerchant, handleCheckboxChange)}
//           </div>

//           {error && <p style={{ color: 'red', fontSize: '0.8rem', margin: '20px 0' }}>{error}</p>}

//           {isLoading ? (
//             <button style={{ opacity: '0.6' }} disabled>
//               Creating...
//             </button>
//           ) : (
//             <button type="submit">Create</button>
//           )}

//           <Link onClick={() => navigate(-1)}>
//             <button style={{ marginLeft: '20px' }} className={classes.btn}>
//               Cancel
//             </button>
//           </Link>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ClientForm;
