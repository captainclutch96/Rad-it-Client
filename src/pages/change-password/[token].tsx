import React from 'react';
import { NextPage } from "next";
import { Form } from "formik/dist/Form";
import { Formik } from "formik/dist/Formik";
import { Wrapper } from "../../components/Wrapper";
import login from "../login";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/core";



export const ChangePassword: NextPage<{token: string}>= ({ token }) => {
        return (
        <Wrapper variant="small">
        <Formik 
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
            <Form>
              <InputField 
              name="newPassword" 
              placeholder="new password" 
              label="New Password"
              type="password"
              />
            <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
              change password
            </Button>
            </Form>
            )}
        </Formik>
        </Wrapper>
    };

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    };
};

export default ChangePassword;