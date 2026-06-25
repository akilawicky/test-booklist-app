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
import {
  useAppContext,
  AppContextData,
  useSignInWithEmailPassword100,
} from '@/context';

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

const Login: React.FC<ScreenProps> = ({ route }) => {
  const [signInWithEmailPassword100Data, setSignInWithEmailPassword100Data] =
    useState<unknown>(null);
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const { signInWithEmailPassword100, signInUserLoading } =
    useSignInWithEmailPassword100();
  const { setAppContext } = useAppContext();

  const navigation = useNavigation();

  useEffect(() => {
    if (signInWithEmailPassword100Data) {
      onsignInWithEmailPassword100Response();
    }
  }, [signInWithEmailPassword100Data]);

  const onPressLoginloginButton = async (values: {
    emailField?: string;
    passwordField?: string;
  }) => {
    try {
      const { emailField, passwordField } = values;

      const responseSignInWithEmailPassword100 =
        await signInWithEmailPassword100({
          email: emailField,
          password: passwordField,
        });
      if (responseSignInWithEmailPassword100) {
        const loginEntity =
          responseSignInWithEmailPassword100 as Record<string, unknown>;
        setAppContext((ctx: AppContextData) => ({
          ...ctx,
          entities: {
            ...ctx.entities,
            LoginEntity: {
              ...ctx.entities.LoginEntity,
              data: loginEntity,
              draft: loginEntity,
              lastSaved: loginEntity,
            },
          },
        }));
        setSignInWithEmailPassword100Data(responseSignInWithEmailPassword100);
      } else {
        // Handle empty response for signInWithEmailPassword100
      }
    } catch (error) {
      const _errorMsg = getWorkflowErrorMessage(error, 'An error occurred');
      if (__DEV__) {
        console.error('[signInWithEmailPassword100] Error:', _errorMsg);
      }
    }
  };

  const onsignInWithEmailPassword100Response = async () => {
    navigation.navigate(Route.DASHBOARD, {});
  };

  const onPressSignUpsignUpButton = async () => {
    navigation.navigate(Route.SIGN_UP, {});
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
      testID={'16a52a1d-593c-4822-9748-cf46abf6dacf'}
      style={sharedStyles.container}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-849450'}
        validationSchema={Yup.object().shape({
          emailField: Yup.string().required('Email is required'),
          passwordField: Yup.string().required('Password is required'),
        })}
        initialValues={{ emailField: '', passwordField: '' }}
        innerRef={formikRef}
        testId={'ASForm-849450'}
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
                    widgetId={'ASText-462912'}
                    style={[text.label.medium, sharedStyles.bio]}
                    accessibilityLabel={
                      STRINGS.Login.ASText_462912.accessibilityLabel
                    }
                  >
                    {STRINGS.Login.ASText_462912.label}
                  </AppText>
                  <AppTextField
                    widgetId={'emailField'}
                    labelTextStyle={[
                      text.label.medium,
                      sharedStyles.emailFieldLabelText,
                    ]}
                    style={sharedStyles.emailField}
                    accessibilityLabel={
                      STRINGS.Login.emailField.accessibilityLabel
                    }
                    label={STRINGS.Login.emailField.label}
                    placeholder={STRINGS.Login.emailField.placeholder}
                  />
                  <AppPasswordTextField
                    widgetId={'passwordField'}
                    style={sharedStyles.emailField}
                    label={STRINGS.Login.passwordField.label}
                    accessibilityLabel={
                      STRINGS.Login.passwordField.accessibilityLabel
                    }
                    placeholder={STRINGS.Login.passwordField.placeholder}
                  />
                </AppColumn>
              </AppColumn>
              <AppColumn
                widgetId={'buttonContainer'}
                spacing={space['2']}
                style={sharedStyles.buttonContainer}
              >
                <AppButton
                  widgetId={'loginButton'}
                  onPress={async () => {
                    const formik = formikRef.current;
                    if (formik) {
                      if (formik.isValid && formik.dirty) {
                        onPressLoginloginButton(values);
                      } else {
                        Object.keys(formik.values).forEach((field) => {
                          formik.setFieldTouched(field, true);
                        });
                      }
                    }
                  }}
                  style={sharedStyles.signUpButton}
                  loading={signInUserLoading}
                  label={STRINGS.Login.loginButton.label}
                  accessibilityLabel={
                    STRINGS.Login.loginButton.accessibilityLabel
                  }
                />
                <AppButton
                  widgetId={'signUpButton'}
                  onPress={() => {
                    onPressSignUpsignUpButton({});
                  }}
                  style={sharedStyles.signUpButton}
                  accessibilityLabel={
                    STRINGS.Login.signUpButton.accessibilityLabel
                  }
                  label={STRINGS.Login.signUpButton.label}
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

export default Login;
