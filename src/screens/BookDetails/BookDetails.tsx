import React, { useRef } from 'react';
import {
  AppBadge,
  AppButton,
  AppColumn,
  AppContainer,
  AppImage,
  AppRow,
  AppSlider,
  AppText,
} from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { imageSources, space, text } from '@/assets';

import { ASForm, ASSpacer, ASDivider } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import { FormikProps } from 'formik';
import * as Yup from 'yup';
import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';

import { STRINGS } from '@/strings';

type FormValues = {
  rating?: string;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const BookDetails: React.FC<ScreenProps> = ({ route }) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const navigation = useNavigation();

  const onPressEditbtnEditBook = async () => {
    navigation.navigate(Route.BOOK_FORM, {});
  };

  const onPressDeletebtnDeleteBook = async () => {
    navigation.navigate(Route.DASHBOARD, {});
  };

  useClearHeaderActions(navigation);

  return (
    <AppContainer
      widgetId={'ASContainer-852657'}
      testID={'6be4c047-e666-4118-808a-6a4c3a0e280c'}
      style={sharedStyles.container2}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-909558'}
        validationSchema={Yup.object().shape({})}
        initialValues={{ rating: 50 }}
        innerRef={formikRef}
        testId={'ASForm-909558'}
      >
        {(formikProps: FormikProps<FormValues>) => {
          return (
            <AppColumn
              widgetId={'_rootcontainer'}
              spacing={space['6']}
              style={sharedStyles.rootcontainer}
            >
              <AppColumn
                widgetId={'headerBlock'}
                spacing={space['6']}
                style={sharedStyles.header}
              >
                <AppImage
                  widgetId={'imgCover'}
                  source={imageSources.image__iweu}
                  resizeMode={'contain'}
                  style={sharedStyles.coverPreview}
                />
                <AppColumn
                  widgetId={'titleArea'}
                  spacing={space['5']}
                  style={sharedStyles.headerSection}
                >
                  <AppText
                    widgetId={'ttlBook'}
                    style={[text.heading.large, sharedStyles.authCountry]}
                    accessibilityLabel={
                      STRINGS.BookDetails.ttlBook.accessibilityLabel
                    }
                  >
                    {STRINGS.BookDetails.ttlBook.label}
                  </AppText>
                  <AppText
                    widgetId={'subAuthor'}
                    style={[text.title.medium, sharedStyles.authCountry]}
                    accessibilityLabel={
                      STRINGS.BookDetails.subAuthor.accessibilityLabel
                    }
                  >
                    {STRINGS.BookDetails.subAuthor.label}
                  </AppText>
                  <AppRow widgetId={'statusRow'} style={sharedStyles.avatarRow}>
                    <AppBadge
                      widgetId={'badgeRead'}
                      label={STRINGS.BookDetails.badgeRead.label}
                    />
                    <ASSpacer
                      name={'spacer1'}
                      style={styles.spacer1Style}
                      testId={'spacer1'}
                    />
                  </AppRow>
                </AppColumn>
              </AppColumn>
              <ASDivider
                name={'div1'}
                style={sharedStyles.authorDividerItem}
                testId={'div1'}
              />
              <AppColumn
                widgetId={'contentArea'}
                spacing={space['5']}
                style={sharedStyles.contentArea}
              >
                <AppRow widgetId={'rowMeta'} style={sharedStyles.avatarRow}>
                  <AppColumn
                    widgetId={'metaLeft'}
                    spacing={space['5']}
                    style={sharedStyles.headerSection}
                  >
                    <AppText
                      widgetId={'txtEdition'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtEdition.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtEdition.label}
                    </AppText>
                    <AppText
                      widgetId={'txtPublisher'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtPublisher.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtPublisher.label}
                    </AppText>
                    <AppText
                      widgetId={'txtPublished'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtPublished.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtPublished.label}
                    </AppText>
                    <AppText
                      widgetId={'txtAcquired'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtAcquired.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtAcquired.label}
                    </AppText>
                  </AppColumn>
                  <AppColumn
                    widgetId={'metaRight'}
                    spacing={space['5']}
                    style={sharedStyles.headerSection}
                  >
                    <AppText
                      widgetId={'txtFormat'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtFormat.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtFormat.label}
                    </AppText>
                    <AppText
                      widgetId={'txtLanguage'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtLanguage.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtLanguage.label}
                    </AppText>
                    <AppText
                      widgetId={'txtPages'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtPages.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtPages.label}
                    </AppText>
                    <AppText
                      widgetId={'txtIsbn10'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtIsbn10.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtIsbn10.label}
                    </AppText>
                    <AppText
                      widgetId={'txtIsbn13'}
                      style={[text.body.medium, sharedStyles.authCountry]}
                      accessibilityLabel={
                        STRINGS.BookDetails.txtIsbn13.accessibilityLabel
                      }
                    >
                      {STRINGS.BookDetails.txtIsbn13.label}
                    </AppText>
                  </AppColumn>
                </AppRow>
                <AppSlider widgetId={'rating'} style={sharedStyles.rating} />
                <AppText
                  widgetId={'notes'}
                  style={[text.label.medium, sharedStyles.bio]}
                  accessibilityLabel={
                    STRINGS.BookDetails.notes.accessibilityLabel
                  }
                >
                  {STRINGS.BookDetails.notes.label}
                </AppText>
                <AppText
                  widgetId={'tags'}
                  style={[text.body.small, sharedStyles.authBirth]}
                  accessibilityLabel={
                    STRINGS.BookDetails.tags.accessibilityLabel
                  }
                >
                  {STRINGS.BookDetails.tags.label}
                </AppText>
                <AppColumn
                  widgetId={'actionBar'}
                  spacing={space['2']}
                  style={sharedStyles.actionBar}
                >
                  <AppButton
                    widgetId={'btnEditBook'}
                    onPress={() => {
                      onPressEditbtnEditBook({});
                    }}
                    style={sharedStyles.btnEditAuthor}
                    label={STRINGS.BookDetails.btnEditBook.label}
                    accessibilityLabel={
                      STRINGS.BookDetails.btnEditBook.accessibilityLabel
                    }
                  />
                  <AppButton
                    widgetId={'btnDeleteBook'}
                    onPress={() => {
                      onPressDeletebtnDeleteBook({});
                    }}
                    style={sharedStyles.btnDeleteAuthor}
                    accessibilityLabel={
                      STRINGS.BookDetails.btnDeleteBook.accessibilityLabel
                    }
                    label={STRINGS.BookDetails.btnDeleteBook.label}
                  />
                </AppColumn>
              </AppColumn>
            </AppColumn>
          );
        }}
      </ASForm>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  spacer1Style: { width: space['2'], height: space['2'] },
});

export default BookDetails;
