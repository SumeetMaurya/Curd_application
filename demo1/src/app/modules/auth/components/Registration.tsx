/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect,  useRef } from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import { Form, Button } from 'react-bootstrap';
import {City, Country, State} from 'country-state-city';

const initialValues = {
  name: '',
  age: '',
  salary: '',
  email: '',
  password: '',
  // countr: '',
  // stat: '',
  // cit: '',
  changepassword: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  age: Yup.string()
    .min(2, 'Minimum age 10')
    .max(3, 'Maximum age 100')
    .required('Age is required'),
  salary: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(8, 'Maximum 50 symbols')
    .required('Salary is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  // countr: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('country is required'),
  // stat: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('state is required'),
  // cit: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('City is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const [countries, setCountries] = useState<{ isoCode: string; name: string }[]>([]);
const [selectedCountry, setSelectedCountry] = useState<string>('');
const [states, setStates] = useState<{ isoCode: string; name: string }[]>([]);
const [selectedState, setSelectedState] = useState<string>('');
const [cities, setCities] = useState<{ name: string }[]>([]);
const [selectedCity, setSelectedCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await register(
          values.name,
          values.age,
          values.salary,
          values.email,
          // values.countr,
          // values.stat,
          // values.cit,
          values.password,
          // values.changepassword, 
        )
        console.log(auth)
        saveAuth(auth)
        console.log(1)
        const {data: user} = await getUserByToken(auth.api_token)
        console.log(user)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The Email is already registered')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  // city state country forms
  useEffect(() => {
    const getCountries = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const result = await Country.getAllCountries();
        const allCountries: { isoCode: string; name: string }[] = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        })) || [];
        const [{ isoCode: firstCountry = '' } = {}] = allCountries;
        setCountries(allCountries);
        setSelectedCountry(firstCountry);
        setIsLoading(false);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };
  
    getCountries();
  }, []);
  
  useEffect(() => {
    const getStates = async (): Promise<void> => {
      try {
        const result = await State.getStatesOfCountry(selectedCountry);
        const allStates: { isoCode: string; name: string }[] = result?.map(({ isoCode, name }) => ({
          isoCode,
          name
        })) || [];
        const [{ isoCode: firstState = '' } = {}] = allStates;
        setCities([]);
        setSelectedCity('');
        setStates(allStates);
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity('');
      }
    };
  
    getStates();
  }, [selectedCountry]);
  
  useEffect(() => {
    const getCities = async (): Promise<void> => {
      try {
        const result = await City.getCitiesOfState(selectedCountry, selectedState);
        const allCities: { name: string }[] = result?.map(({ name }) => ({
          name
        })) || [];
        const [{ name: firstCity = '' } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {
        setCities([]);
      }
    };
  
    getCities();
  }, [selectedState]);
  
  
  // const secondDivRef = useRef(null);
  // const thirdDivRef = useRef(null);
  // const fourthDivRef = useRef(null);

  // const handleFirstDivClick = () => {
  //   if (secondDivRef.current) {
  //     secondDivRef.current.click();
  //   }
  // };
  // const handleSecondDivClick = () =>{
  //   if (thirdDivRef.current) {
  //     thirdDivRef.current.click();
  //   }
  // }
  // const handlethirdDivClick = () =>{
  //   if (fourthDivRef.current) {
  //     fourthDivRef.current.click();
  //   }
  // }
  const cityname = selectedCity
  var countryname = countries.find(
    (country) => country.isoCode === selectedCountry
  )?.name
  var statename = states.find((state) => state.isoCode === selectedState)?.name || ''



  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Sign Up</h1>
        {/* end::Title */}

        {/* <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div> */}
      </div>
      {/* end::Heading */}

      {/* begin::Login options */}
      {/* <div className='row g-3 mb-9'> */}
        {/* begin::Col */}
        {/* <div className='col-md-6'> */}
          {/* begin::Google link */}
          {/* <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
              className='h-15px me-3'
            />
            Sign in with Google
          </a> */}
          {/* end::Google link */}
        {/* </div> */}
        {/* end::Col */}

        {/* begin::Col */}
        {/* <div className='col-md-6'> */}
          {/* begin::Google link */}
          {/* <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
              className='theme-light-show h-15px me-3'
            />
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black-dark.svg')}
              className='theme-dark-show h-15px me-3'
            />
            Sign in with Apple
          </a> */}
          {/* end::Google link */}
        {/* </div> */}
        {/* end::Col */}
      {/* </div> */}
      {/* end::Login options */}
{/* 
      <div className='separator separator-content my-14'>
        <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with email</span>
      </div> */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group name */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Name</label>
        <input
          placeholder='Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('name')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.name && formik.errors.name,
            },
            {
              'is-valid': formik.touched.name && !formik.errors.name,
            }
          )}
        />
        {formik.touched.name && formik.errors.name && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.name}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Age</label>
        <input
          placeholder='Age'
          type='number'
          autoComplete='off'
          {...formik.getFieldProps('age')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.age && formik.errors.age,
            },
            {
              'is-valid': formik.touched.age && !formik.errors.age,
            }
          )}
        />
        {formik.touched.age && formik.errors.age && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.age}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>


      <div className='fv-row mb-8'>
        {/* begin::Form group Lastname */}
        <label className='form-label fw-bolder text-dark fs-6'>Salary</label>
        <input
          placeholder='Salary'
          type='number'
          autoComplete='off'
          {...formik.getFieldProps('salary')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.salary && formik.errors.salary,
            },
            {
              'is-valid': formik.touched.salary && !formik.errors.salary,
            }
          )}
        />
        {formik.touched.salary && formik.errors.salary && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.salary}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>


      {/* begin::Form group Email */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
{/* 
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>Country</label>
        <input
          placeholder='Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('countr')}
          value={countryname}
          className={clsx(
          'form-control bg-transparent',
            {
              'is-invalid': formik.touched.countr && formik.errors.countr,
            },
            {
              'is-valid': formik.touched.countr && !formik.errors.countr,
            }
          )}
        />
        {formik.touched.countr && formik.errors.countr && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.countr}</span>
            </div>
          </div>
        )}
      </div>

      {/*City state country*/}
      {/* <p><b>Country</b></p>
         <Form.Group controlId="country">
          {isLoading && (
            <p className="loading">Loading countries. Please wait...</p>
          )}
          <Form.Control
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.countr && formik.errors.countr},
            {
              'is-valid': formik.touched.countr && !formik.errors.countr,
            }
          )}
            as="select"
            
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
          >
            {countries.map(({ isoCode, name }) => (
              <option value={isoCode} key={isoCode}>
                <b>{name}</b>
              </option>
            ))}
            {/* {formik.touched.countr && formik.errors.countr && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
            </div>
          </div>
        )} 
          </Form.Control>
        <span role='alert'>{formik.errors.countr}</span>
        </Form.Group>

        <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-dark fs-6'>State</label>
        <input
          placeholder='Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps(statename)}
          value={statename}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.stat && formik.errors.stat,
            },
            {
              'is-valid': formik.touched.stat && !formik.errors.stat,
            }
            )}
            />
        {formik.touched.stat && formik.errors.stat && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.stat}</span>
            </div>
          </div>
        )}
      </div>
        <p><b>State</b></p>
        <Form.Group controlId="state">
          <Form.Control
            className={clsx(
              'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.stat && formik.errors.stat,
                },
                {
                  'is-valid': formik.touched.stat && !formik.errors.stat,
                }
              )}
            as="select"
            value={selectedState}
            onChange={(event) => setSelectedState(event.target.value)}

          >
            {states.length > 0 ? (
              states.map(({ isoCode, name }) => (
                <option value={isoCode} key={isoCode}>
                  <b>{name}</b>
                </option>
              ))
            ) : (
              <option value="" key="">
                No state found
              </option>
            )}
          </Form.Control>
        </Form.Group>


        <div className='fv-row mb-8' >
        <label className='form-label fw-bolder text-dark fs-6'>Country</label>
        <input
          placeholder='Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('cit')}
          value={cityname}
          className={clsx(
          'form-control bg-transparent',
            {
              'is-invalid': formik.touched.cit && formik.errors.cit,
            },
            {
              'is-valid': formik.touched.cit && !formik.errors.cit,
            }
          )}
        />
        {formik.touched.cit && formik.errors.cit && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.cit}</span>
            </div>
          </div>
        )}
      </div>


        <p><b>City</b></p>
        <Form.Group controlId="city">
          <Form.Control
            as="select"
            value={selectedCity}
            className={clsx(
              'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.cit && formik.errors.cit,
                },
                {
                  'is-valid': formik.touched.cit && !formik.errors.cit,
                }
              )}
            onChange={(event) => setSelectedCity(event.target.value)}

          >
            {cities.length > 0 ? (
              cities.map(({ name }) => (
                <option value={name} key={name}>
                  <b>{name}</b>
                </option>
              ))
            ) : (
              <option value="">No cities found</option>
            )}
          </Form.Control>
        </Form.Group>  */}
        {/*city state country ends*/}
      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}


      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
            I Accept the{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
              Terms
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
