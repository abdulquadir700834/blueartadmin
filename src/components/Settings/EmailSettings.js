import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useUpdateEmailSettingsMutationMutation, useSingleUserDetailsQuery } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

const EmailSettings = ({ setting, module }) => {
  const [createPost, responseInfo] = useUpdateEmailSettingsMutationMutation();
  const [isLoading, setIsLoading] = useState(false);
let navigate = useNavigate();
  const userid = sessionStorage?.getItem('userId');

  const data = useSingleUserDetailsQuery(userid);

  const schema = yup.object().shape({
    EmailType: yup.string().min(3, 'EmailType must be at least 3 letters').required('EmailType is required'),
    Host: yup.string().when('EmailType', {
      is: (value) => value === 'smtp',
      then: yup.string().min(3, 'Host must be at least 3 letters').required('Host is required'),
    }),
    Port: yup.string().when('EmailType', {
      is: (value) => value === 'smtp',
      then: yup.string().min(3, 'Port must be at least 3 letters').required('Port is required'),
    }),
    User: yup.string().when('EmailType', {
      is: (value) => value === 'smtp',
      then: yup.string().min(3, 'User must be at least 3 letters').required('User is required'),
    }),
    Password: yup.string().when('EmailType', {
      is: (value) => value === 'smtp',
      then: yup.string().min(3, 'Password must be at least 3 letters').required('Password is required'),
    }),
    Audience: yup.string().when('EmailType', {
      is: (value) => value === 'smtp',
      then: yup.string().min(3, 'Audience must be at least 3 letters').required('Audience is required'),
    }),
    SendGridUser: yup.string().when('EmailType', {
      is: (value) => value === 'sendgrid',
      then: yup.string().min(3, 'SendGridUser must be at least 3 letters').required('SendGridUser is required'),
    }),
    SendGridApiKey: yup.string().when('EmailType', {
      is: (value) => value === 'sendgrid',
      then: yup.string().min(3, 'SendGridApiKey must be at least 3 letters').required('SendGridApiKey is required'),
    }),
  });

  const formik = useFormik({
    initialValues: {
      EmailType: setting?.data?.info?.EmailType,
      Host: setting?.data?.info?.Smtp?.Host,
      Port: setting?.data?.info?.Smtp?.Port,
      User: setting?.data?.info?.Smtp?.User,
      Password: setting?.data?.info?.Smtp?.Password,
      Audience: setting?.data?.info?.Smtp?.Audience,
      SendGridUser: setting?.data?.info?.SendGrid?.User,
      SendGridApiKey: setting?.data?.info?.SendGrid?.ApiKey,
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      setIsLoading(true)
      let postData = {
        EmailType: values.EmailType,
        User: values.User,
        Password: values.Password,
        ...(values.EmailType === 'smtp' && {
          Host: values.Host,
          Port: values.Port,
          User: values.User,
          Password: values.Password,
          Audience: values.Audience,
          SendGridUser: values.SendGridUser,
          SendGridApiKey: values.SendGridApiKey,
        }),
      };

      createPost(postData).then((res) => {
        console.log(res);
        if (res?.data?.status) {
          toast.success(res?.data?.info);
          setIsLoading(false)
          setTimeout(() => navigate('/settings'), 1500);
        } else {
          toast.error(res?.error?.data?.info);
          setIsLoading(false)
        }
      });
    },
  });

  return (
    <>
    {isLoading && <Loader />}
      <ToastContainer></ToastContainer>

      <div className="">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-sm-12">
              <p style={{ marginLeft: '50px', fontSize: '2rem', color: '#fff', fontWeight: '800' }}>Email Settings</p>
              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="EmailType">
                      <Form.Label>Email Type</Form.Label>
                      <Form.Select
                        name="EmailType"
                        value={formik.values.EmailType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Email Type</option>
                        <option value="smtp">SMTP</option>
                        <option value="sendgrid">SendGrid</option>
                      </Form.Select>
                      {formik.errors.EmailType && formik.touched.EmailType && (
                        <div className="formik-error">{formik.errors.EmailType}</div>
                      )}
                    </Form.Group>

                    {formik.values.EmailType === 'smtp' && (
                      <>
                        <Form.Group controlId="Host">
                          <Form.Label>Host</Form.Label>
                          <Form.Control
                            type="text"
                            name="Host"
                            placeholder="Host"
                            value={formik.values.Host}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.Host && formik.touched.Host && (
                            <div className="formik-error">{formik.errors.Host}</div>
                          )}
                        </Form.Group>

                        <Form.Group controlId="Port">
                          <Form.Label>Port</Form.Label>
                          <Form.Control
                            type="text"
                            name="Port"
                            placeholder="Port"
                            value={formik.values.Port}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.Port && formik.touched.Port && (
                            <div className="formik-error">{formik.errors.Port}</div>
                          )}
                        </Form.Group>

                        <Form.Group controlId="User">
                          <Form.Label>User</Form.Label>
                          <Form.Control
                            type="text"
                            name="User"
                            placeholder="User"
                            value={formik.values.User}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.User && formik.touched.User && (
                            <div className="formik-error">{formik.errors.User}</div>
                          )}
                        </Form.Group>

                        <Form.Group controlId="Password">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="text"
                            name="Password"
                            placeholder="Password"
                            value={formik.values.Password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.Password && formik.touched.Password && (
                            <div className="formik-error">{formik.errors.Password}</div>
                          )}
                        </Form.Group>

                        <Form.Group controlId="Audience">
                          <Form.Label>Audience</Form.Label>
                          <Form.Control
                            type="text"
                            name="Audience"
                            placeholder="Audience"
                            value={formik.values.Audience}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.Audience && formik.touched.Audience && (
                            <div className="formik-error">{formik.errors.Audience}</div>
                          )}
                        </Form.Group>
                      </>
                    )}

                    {formik.values.EmailType === 'sendgrid' && (
                      <>
                        <Form.Group controlId="SendGridUser">
                          <Form.Label>SendGrid User</Form.Label>
                          <Form.Control
                            type="text"
                            name="SendGridUser"
                            placeholder="SendGrid User"
                            value={formik.values.SendGridUser}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.SendGridUser && formik.touched.SendGridUser && (
                            <div className="formik-error">{formik.errors.SendGridUser}</div>
                          )}
                        </Form.Group>

                        <Form.Group controlId="SendGridApiKey">
                          <Form.Label>SendGrid API Key</Form.Label>
                          <Form.Control
                            type="text"
                            name="SendGridApiKey"
                            placeholder="SendGrid API Key"
                            value={formik.values.SendGridApiKey}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.SendGridApiKey && formik.touched.SendGridApiKey && (
                            <div className="formik-error">{formik.errors.SendGridApiKey}</div>
                          )}
                        </Form.Group>
                      </>
                    )}
                    {
                      module?.SettingsModule?.Write &&
                      <div className="col-12" style={{ margin: '20px 0' }}>
                        <button className="btn btn-primary w-100 rounded-pill" type="submit">
                          <i className="bi bi-sd-card-fill me-1" /> Save changes
                        </button>
                      </div>
                    }
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailSettings;
