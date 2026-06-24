import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  AppButton,
  AppColumn,
  AppContainer,
  AppPasswordTextField,
  AppText,
  AppTextField,
} from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { color, space, text } from '@/assets';

import { ASForm, ASAppHeader } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import { FormikProps } from 'formik';
import * as Yup from 'yup';
import Route from '@/navigation/routes';
import { getWorkflowErrorMessage } from '@/utils/common.utils';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { useSignUpWithEmailPassword100 } from '@/context';

import { STRINGS } from '@/strings';

type FormValues = {
  emailField?: string;
  passwordField?: string;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const SignUp: React.FC<ScreenProps> = ({ route }) => {
  const [signUpWithEmailPassword100Data, setSignUpWithEmailPassword100Data] =
    useState<string>('');
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const { signUpWithEmailPassword100, signUpUserLoading } =
    useSignUpWithEmailPassword100();

  const navigation = useNavigation();

  useEffect(() => {
    if (signUpWithEmailPassword100Data) {
      onsignUpWithEmailPassword100Response();
    }
  }, [signUpWithEmailPassword100Data]);

  const onPressSignUpsignUpButton = async (values: {
    emailField?: string;
    passwordField?: string;
  }) => {
    try {
      const { emailField, passwordField } = values;

      const responseSignUpWithEmailPassword100 =
        await signUpWithEmailPassword100({
          email: emailField,
          password: passwordField,
        });
      if (responseSignUpWithEmailPassword100) {
        setSignUpWithEmailPassword100Data(responseSignUpWithEmailPassword100);
      } else {
        // Handle empty response for signUpWithEmailPassword100
      }
    } catch (error) {
      const _errorMsg = getWorkflowErrorMessage(error, 'An error occurred');
      if (__DEV__) {
        console.error('[signUpWithEmailPassword100] Error:', _errorMsg);
      }
    }
  };

  const onsignUpWithEmailPassword100Response = async () => {
    navigation.navigate(Route.LOGIN, {});
  };

  useClearHeaderActions(navigation);
  const renderHeader = useCallback(
    () => (
      <ASAppHeader
        styles={{
          borderColor: color.border.default,
          backgroundColor: color.brand.primary,
          paddingLeft: 8,
          height: 60,
          paddingRight: 8,
        }}
        headerTitle={{
          title: 'Page Title',
          alignment: 'left',
          textStyles: [
            text.title.medium,
            { textDecorationLine: 'none', flex: 1, textAlign: 'left' },
          ],
        }}
        backButton={{
          isEnabled: true,
          icon: 'arrow_back',
          size: 24,
          isLargerBackButton: true,
          color: 'black',
          onPress: () => navigation.goBack(),
        }}
        actions={[]}
      />
    ),
    [navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: renderHeader,
    });
  }, [navigation, renderHeader]);

  return (
    <AppContainer
      widgetId={'ASContainer-990441'}
      testID={'b7b055da-8016-49f0-879a-9c2490bad04a'}
      style={sharedStyles.container}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-276151'}
        validationSchema={Yup.object().shape({
          emailField: Yup.string().required('Email is required'),
          passwordField: Yup.string().required('Password is required'),
        })}
        initialValues={{ emailField: '', passwordField: '' }}
        innerRef={formikRef}
        testId={'ASForm-276151'}
      >
        {(formikProps: FormikProps<FormValues>) => {
          const { values } = formikProps;
          return (
            <>
              <AppColumn
                widgetId={'mainContainer'}
                spacing={8}
                style={sharedStyles.mainContainer}
              >
                <AppColumn
                  widgetId={'fieldContainer'}
                  spacing={space['4']}
                  style={sharedStyles.fieldContainer}
                >
                  <AppText
                    widgetId={'ASText-689879'}
                    style={[text.label.medium, sharedStyles.bio]}
                    accessibilityLabel={
                      STRINGS.SignUp.ASText_689879.accessibilityLabel
                    }
                  >
                    {STRINGS.SignUp.ASText_689879.label}
                  </AppText>
                  <AppTextField
                    widgetId={'emailField'}
                    labelTextStyle={[
                      text.label.medium,
                      sharedStyles.emailFieldLabelText,
                    ]}
                    style={sharedStyles.emailField}
                    accessibilityLabel={
                      STRINGS.SignUp.emailField.accessibilityLabel
                    }
                    placeholder={STRINGS.SignUp.emailField.placeholder}
                    label={STRINGS.SignUp.emailField.label}
                  />
                  <AppPasswordTextField
                    widgetId={'passwordField'}
                    style={sharedStyles.emailField}
                    accessibilityLabel={
                      STRINGS.SignUp.passwordField.accessibilityLabel
                    }
                    placeholder={STRINGS.SignUp.passwordField.placeholder}
                    label={STRINGS.SignUp.passwordField.label}
                  />
                </AppColumn>
              </AppColumn>
              <AppColumn
                widgetId={'buttonContainer'}
                spacing={space['2']}
                style={sharedStyles.buttonContainer}
              >
                <AppButton
                  widgetId={'signUpButton'}
                  onPress={async () => {
                    const formik = formikRef.current;
                    if (formik) {
                      if (formik.isValid && formik.dirty) {
                        onPressSignUpsignUpButton(values);
                      } else {
                        Object.keys(formik.values).forEach((field) => {
                          formik.setFieldTouched(field, true);
                        });
                      }
                    }
                  }}
                  style={sharedStyles.signUpButton}
                  loading={signUpUserLoading}
                  label={STRINGS.SignUp.signUpButton.label}
                  accessibilityLabel={
                    STRINGS.SignUp.signUpButton.accessibilityLabel
                  }
                />
              </AppColumn>
            </>
          );
        }}
      </ASForm>
    </AppContainer>
  );
};

const styles = StyleSheet.create({});

export default SignUp;
