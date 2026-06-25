import React, { useRef } from 'react';
import {
  AppButton,
  AppColumn,
  AppContainer,
  AppDatePicker,
  AppDropDown,
  AppImage,
  AppRow,
  AppText,
  AppTextField,
} from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { imageSources, space, text } from '@/assets';

import { ASForm, ASDivider } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import { FormikProps } from 'formik';
import * as Yup from 'yup';
import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import {
  usePatchAccount1106,
  useAppContext,
  AppContextData,
  useSignInWithEmailPassword100,
} from '@/context';

import { STRINGS } from '@/strings';

type FormValues = {
  inFullName?: string;
  inFirstName?: string;
  inLastName?: string;
  inPenName?: string;
  ddCountry?: string;
  dpBirth?: string;
  dpDeath?: string;
  inNationality?: string;
  inBio?: string;
  inNotes?: string;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const AuthorForm: React.FC<ScreenProps> = ({ route }) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const { patchAccount1106, responseBodyLoading } = usePatchAccount1106();
  const { appContext, setAppContext } = useAppContext();
  const { accessToken } = useSignInWithEmailPassword100();

  const navigation = useNavigation();

  const mapAuthorFormValuesToauthorDraft = (values: any) => {
    const toSnakeCase = (s: string) =>
      s.replace(/([A-Z])/g, '_$1').toLowerCase();
    return Object.fromEntries(
      Object.entries(values).map(([k, v]) => [toSnakeCase(k), v]),
    );
  };

  const onPressSavebtnSaveAuthor = async () => {
    const formValues = formikRef.current?.values || {};
    const partialauthorDraft = mapAuthorFormValuesToauthorDraft(formValues);
    setAppContext((ctx: AppContextData) => ({
      ...ctx,
      entities: {
        ...ctx.entities,
        author: {
          ...ctx.entities.author,
          draft: {
            ...ctx.entities.author.draft,
            ...partialauthorDraft,
          },
        },
      },
    }));
    const mergedauthorDraft = {
      ...appContext.entities.author.draft,
      ...partialauthorDraft,
    };

    await patchAccount1106({
      countryCode: mergedauthorDraft.country,
      lastName: mergedauthorDraft.last_name,
      dateOfBirth: mergedauthorDraft.birth_date,
      updatedAt: mergedauthorDraft.updated_at,
      accessToken,
      firstName: mergedauthorDraft.first_name,
      fullName: mergedauthorDraft.full_name,
      userId: mergedauthorDraft.id,
      nationality: mergedauthorDraft.nationality,
      createdAt: mergedauthorDraft.created_at,
      countryOfBirth: mergedauthorDraft.country,
    });
  };

  const onPressCancelbtnCancelAuthor = async () => {
    navigation.navigate(Route.AUTHOR_LIST, {});
  };

  useClearHeaderActions(navigation);

  return (
    <AppContainer
      widgetId={'ASContainer-295119'}
      testID={'dc5aa96c-6bfc-4c54-8322-d2e3b1b1f4c7'}
      style={sharedStyles.container2}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-295283'}
        validationSchema={Yup.object().shape({})}
        initialValues={{
          inFullName: '',
          inFirstName: '',
          inLastName: '',
          inPenName: '',
          ddCountry: '',
          dpBirth: '',
          dpDeath: '',
          inNationality: '',
          inBio: '',
          inNotes: '',
        }}
        innerRef={formikRef}
        testId={'ASForm-295283'}
      >
        {(formikProps: FormikProps<FormValues>) => {
          return (
            <AppColumn
              widgetId={'_rootcontainer'}
              spacing={space['6']}
              style={sharedStyles.rootcontainer}
            >
              <AppColumn
                widgetId={'headerSection'}
                spacing={space['5']}
                style={sharedStyles.headerSection}
              >
                <AppText
                  widgetId={'frmAuthorHdr'}
                  style={[text.heading.medium, sharedStyles.authCountry]}
                  accessibilityLabel={
                    STRINGS.AuthorForm.frmAuthorHdr.accessibilityLabel
                  }
                >
                  {STRINGS.AuthorForm.frmAuthorHdr.label}
                </AppText>
                <AppRow widgetId={'avatarRow'} style={sharedStyles.avatarRow}>
                  <AppImage
                    widgetId={'imgAuthorAvatar'}
                    source={imageSources.image__6gntl}
                    style={sharedStyles.authorAvatar}
                  />
                  <AppColumn
                    widgetId={'avatarTextCol'}
                    spacing={20}
                    style={styles.avatarTextColStyle}
                  >
                    <AppText
                      widgetId={'authorNamePreview'}
                      style={[text.title.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.AuthorForm.authorNamePreview.accessibilityLabel
                      }
                    >
                      {STRINGS.AuthorForm.authorNamePreview.label}
                    </AppText>
                    <AppText
                      widgetId={'authorSubtitle'}
                      style={[text.body.medium, sharedStyles.authBirth]}
                      accessibilityLabel={
                        STRINGS.AuthorForm.authorSubtitle.accessibilityLabel
                      }
                    >
                      {STRINGS.AuthorForm.authorSubtitle.label}
                    </AppText>
                  </AppColumn>
                </AppRow>
              </AppColumn>
              <AppColumn
                widgetId={'formFields'}
                spacing={space['4']}
                style={sharedStyles.formFields}
              >
                <AppTextField
                  widgetId={'inFullName'}
                  style={sharedStyles.emailField}
                  accessibilityLabel={
                    STRINGS.AuthorForm.inFullName.accessibilityLabel
                  }
                  label={STRINGS.AuthorForm.inFullName.label}
                  placeholder={STRINGS.AuthorForm.inFullName.placeholder}
                />
                <AppTextField
                  widgetId={'inFirstName'}
                  style={sharedStyles.emailField}
                  placeholder={STRINGS.AuthorForm.inFirstName.placeholder}
                  label={STRINGS.AuthorForm.inFirstName.label}
                  accessibilityLabel={
                    STRINGS.AuthorForm.inFirstName.accessibilityLabel
                  }
                />
                <AppTextField
                  widgetId={'inLastName'}
                  style={sharedStyles.emailField}
                  accessibilityLabel={
                    STRINGS.AuthorForm.inLastName.accessibilityLabel
                  }
                  placeholder={STRINGS.AuthorForm.inLastName.placeholder}
                  label={STRINGS.AuthorForm.inLastName.label}
                />
                <AppTextField
                  widgetId={'inPenName'}
                  style={sharedStyles.emailField}
                  accessibilityLabel={
                    STRINGS.AuthorForm.inPenName.accessibilityLabel
                  }
                  label={STRINGS.AuthorForm.inPenName.label}
                  placeholder={STRINGS.AuthorForm.inPenName.placeholder}
                />
                <AppDropDown
                  widgetId={'ddCountry'}
                  options={[
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt0.label,
                      value: 'unitedStates',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt1.label,
                      value: 'unitedKingdom',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt2.label,
                      value: 'Canada',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt3.label,
                      value: 'Israel',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt4.label,
                      value: 'France',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt5.label,
                      value: 'Germany',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt6.label,
                      value: 'Japan',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt7.label,
                      value: 'India',
                    },
                    {
                      label: STRINGS.AuthorForm.ddCountry.options.opt8.label,
                      value: 'Australia',
                    },
                  ]}
                  label={STRINGS.AuthorForm.ddCountry.label}
                  placeholder={STRINGS.AuthorForm.ddCountry.placeholder}
                  searchPlaceholder={
                    STRINGS.AuthorForm.ddCountry.searchPlaceholder
                  }
                />
                <AppDatePicker
                  widgetId={'dpBirth'}
                  style={sharedStyles.dpAcquired}
                  placeholder={STRINGS.AuthorForm.dpBirth.placeholder}
                  label={STRINGS.AuthorForm.dpBirth.label}
                />
                <AppDatePicker
                  widgetId={'dpDeath'}
                  style={sharedStyles.dpAcquired}
                  label={STRINGS.AuthorForm.dpDeath.label}
                  placeholder={STRINGS.AuthorForm.dpDeath.placeholder}
                />
                <AppTextField
                  widgetId={'inNationality'}
                  placeholder={''}
                  keyboardType={'url'}
                  style={sharedStyles.emailField}
                  accessibilityLabel={
                    STRINGS.AuthorForm.inNationality.accessibilityLabel
                  }
                  label={STRINGS.AuthorForm.inNationality.label}
                />
                <AppTextField
                  widgetId={'inBio'}
                  multiline={true}
                  style={sharedStyles.emailField}
                  placeholder={STRINGS.AuthorForm.inBio.placeholder}
                  label={STRINGS.AuthorForm.inBio.label}
                  accessibilityLabel={
                    STRINGS.AuthorForm.inBio.accessibilityLabel
                  }
                />
                <AppTextField
                  widgetId={'inNotes'}
                  multiline={true}
                  style={sharedStyles.emailField}
                  label={STRINGS.AuthorForm.inNotes.label}
                  placeholder={STRINGS.AuthorForm.inNotes.placeholder}
                  accessibilityLabel={
                    STRINGS.AuthorForm.inNotes.accessibilityLabel
                  }
                />
              </AppColumn>
              <ASDivider
                name={'formDivider'}
                style={sharedStyles.authorDividerItem}
                testId={'formDivider'}
              />
              <AppColumn
                widgetId={'formButtonBar'}
                spacing={space['2']}
                style={sharedStyles.actionBar}
              >
                <AppButton
                  widgetId={'btnSaveAuthor'}
                  onPress={() => {
                    onPressSavebtnSaveAuthor({});
                  }}
                  style={sharedStyles.btnEditAuthor}
                  loading={responseBodyLoading}
                  label={STRINGS.AuthorForm.btnSaveAuthor.label}
                  accessibilityLabel={
                    STRINGS.AuthorForm.btnSaveAuthor.accessibilityLabel
                  }
                />
                <AppButton
                  widgetId={'btnCancelAuthor'}
                  onPress={() => {
                    onPressCancelbtnCancelAuthor({});
                  }}
                  textStyle={[
                    text.label.medium,
                    sharedStyles.btnCancelAuthorText,
                  ]}
                  style={sharedStyles.btnCancelAuthor}
                  label={STRINGS.AuthorForm.btnCancelAuthor.label}
                  accessibilityLabel={
                    STRINGS.AuthorForm.btnCancelAuthor.accessibilityLabel
                  }
                />
              </AppColumn>
            </AppColumn>
          );
        }}
      </ASForm>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  avatarTextColStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    flexShrink: 1,
    overflow: 'visible',
  },
});

export default AuthorForm;
