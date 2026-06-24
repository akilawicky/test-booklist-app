import React, { useRef } from 'react';
import {
  AppButton,
  AppColumn,
  AppContainer,
  AppDatePicker,
  AppDropDown,
  AppImage,
  AppRow,
  AppSlider,
  AppText,
  AppTextField,
} from '@/components/shared';

import { useNavigation } from '@react-navigation/native';

import { imageSources, space, text } from '@/assets';

import { ASForm } from '@/components';

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import { FormikProps } from 'formik';
import * as Yup from 'yup';
import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import {
  AppContextData,
  useAppContext,
  useBookWorkflows,
} from '@/context';
import {
  BookEntity,
  mapBookApiToEntity,
  mapBookDraftToFormValues,
  mapBookEntityToApiBody,
  mapBookFormValuesToDraft,
} from '@/utils/book.mappers';

import { STRINGS } from '@/strings';

type FormValues = {
  inTitle?: string;
  ddAuthor?: string;
  inEdition?: string;
  inPublisher?: string;
  dpPublished?: string;
  dpAcquired?: string;
  ddFormat?: string;
  inIsbn10?: string;
  inIsbn13?: string;
  ddLanguage?: string;
  inPages?: string;
  ddReadStatus?: string;
  dpReadStart?: string;
  dpReadFinish?: string;
  slRating?: string;
  inTags?: string;
  inReview?: string;
};

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const BookForm: React.FC<ScreenProps> = ({ route }) => {
  const formikRef = useRef<FormikProps<FormValues>>(null);
  const { appContext, setAppContext } = useAppContext();
  const { createBook, updateBook, saveBookLoading } = useBookWorkflows();

  const navigation = useNavigation<any>();

  const bookState = appContext.entities?.book || {};
  const bookDraft = (bookState.draft || {}) as BookEntity;
  const entityInitialValues = mapBookDraftToFormValues(bookDraft);

  const upsertBookInList = (list: unknown[], savedBook: BookEntity) => {
    const savedId = savedBook.id;
    if (savedId === undefined || savedId === null) {
      return [...list, savedBook];
    }
    const existingIndex = list.findIndex(
      (item) => (item as BookEntity)?.id === savedId,
    );
    if (existingIndex < 0) return [...list, savedBook];
    return list.map((item, index) => (index === existingIndex ? savedBook : item));
  };

  const onPressSavebtnSaveBook = async () => {
    const formValues = (formikRef.current?.values || {}) as FormValues;
    const partialBookDraft = mapBookFormValuesToDraft(formValues);
    const mergedBookDraft = {
      ...bookDraft,
      ...partialBookDraft,
    };
    const requestBody = mapBookEntityToApiBody(mergedBookDraft);
    const action = bookState.action === 'edit' ? 'edit' : 'add';
    const bookId = mergedBookDraft.id as string | number | undefined;

    setAppContext((ctx: AppContextData) => ({
      ...ctx,
      entities: {
        ...ctx.entities,
        book: {
          ...ctx.entities.book,
          draft: mergedBookDraft,
        },
      },
    }));

    try {
      const response =
        action === 'edit' && bookId !== undefined
          ? await updateBook({ id: bookId, body: requestBody })
          : await createBook({ body: requestBody });
      const savedBook = mapBookApiToEntity({
        ...mergedBookDraft,
        ...((response || {}) as BookEntity),
      });

      setAppContext((ctx: AppContextData) => {
        const currentList = Array.isArray(ctx.entities.book.list)
          ? ctx.entities.book.list
          : [];
        return {
          ...ctx,
          entities: {
            ...ctx.entities,
            book: {
              ...ctx.entities.book,
              selected: savedBook,
              draft: savedBook,
              lastSaved: response,
              list: upsertBookInList(currentList, savedBook),
            },
          },
        };
      });
    } catch (error) {
      if (__DEV__) {
        console.error('[BookForm] Failed to save book:', error);
      }
      return;
    }

    navigation.navigate(Route.DASHBOARD, {});
  };

  const onPressCancelbtnCancelBook = async () => {
    navigation.navigate(Route.DASHBOARD, {});
  };

  useClearHeaderActions(navigation);

  return (
    <AppContainer
      widgetId={'ASContainer-361425'}
      testID={'b5539ba3-f5ce-4e0a-ab31-9fa4eff1fd38'}
      style={sharedStyles.container2}
    >
      <ASForm
        enableReinitialize={true}
        name={'ASForm-419327'}
        validationSchema={Yup.object().shape({})}
        initialValues={{
          inTitle: '',
          ddAuthor: '',
          inEdition: '',
          inPublisher: '',
          dpPublished: '',
          dpAcquired: '',
          ddFormat: '',
          inIsbn10: '',
          inIsbn13: '',
          ddLanguage: '',
          inPages: '',
          ddReadStatus: '',
          dpReadStart: '',
          dpReadFinish: '',
          slRating: 50,
          inTags: '',
          inReview: '',
          ...entityInitialValues,
        }}
        innerRef={formikRef}
        testId={'ASForm-419327'}
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
                  widgetId={'frmTitle'}
                  style={[text.heading.medium, sharedStyles.authCountry]}
                  accessibilityLabel={
                    STRINGS.BookForm.frmTitle.accessibilityLabel
                  }
                >
                  {STRINGS.BookForm.frmTitle.label}
                </AppText>
              </AppColumn>
              <AppColumn
                widgetId={'heroImageBlock'}
                spacing={space['6']}
                style={sharedStyles.header}
              >
                <AppImage
                  widgetId={'coverPreview'}
                  source={imageSources.image__7j48f}
                  resizeMode={'contain'}
                  style={sharedStyles.coverPreview}
                />
              </AppColumn>
              <AppColumn
                widgetId={'formFields'}
                spacing={space['4']}
                style={sharedStyles.formFields}
              >
                <AppTextField
                  widgetId={'inTitle'}
                  style={sharedStyles.emailField}
                  label={STRINGS.BookForm.inTitle.label}
                  placeholder={STRINGS.BookForm.inTitle.placeholder}
                  accessibilityLabel={
                    STRINGS.BookForm.inTitle.accessibilityLabel
                  }
                />
                <AppDropDown
                  widgetId={'ddAuthor'}
                  options={[
                    {
                      label: STRINGS.BookForm.ddAuthor.options.opt0.label,
                      value: 'andrewHunt',
                    },
                    {
                      label: STRINGS.BookForm.ddAuthor.options.opt1.label,
                      value: 'jamesClear',
                    },
                    {
                      label: STRINGS.BookForm.ddAuthor.options.opt2.label,
                      value: 'frankHerbert',
                    },
                    {
                      label: STRINGS.BookForm.ddAuthor.options.opt3.label,
                      value: 'yuvalNoahHarari',
                    },
                    {
                      label: STRINGS.BookForm.ddAuthor.options.opt4.label,
                      value: 'robertCMartin',
                    },
                  ]}
                  placeholder={STRINGS.BookForm.ddAuthor.placeholder}
                  label={STRINGS.BookForm.ddAuthor.label}
                  searchPlaceholder={
                    STRINGS.BookForm.ddAuthor.searchPlaceholder
                  }
                />
                <AppTextField
                  widgetId={'inEdition'}
                  style={sharedStyles.emailField}
                  accessibilityLabel={
                    STRINGS.BookForm.inEdition.accessibilityLabel
                  }
                  label={STRINGS.BookForm.inEdition.label}
                  placeholder={STRINGS.BookForm.inEdition.placeholder}
                />
                <AppTextField
                  widgetId={'inPublisher'}
                  style={sharedStyles.emailField}
                  accessibilityLabel={
                    STRINGS.BookForm.inPublisher.accessibilityLabel
                  }
                  label={STRINGS.BookForm.inPublisher.label}
                  placeholder={STRINGS.BookForm.inPublisher.placeholder}
                />
                <AppDatePicker
                  widgetId={'dpPublished'}
                  style={sharedStyles.dpAcquired}
                  placeholder={STRINGS.BookForm.dpPublished.placeholder}
                  label={STRINGS.BookForm.dpPublished.label}
                />
                <AppDatePicker
                  widgetId={'dpAcquired'}
                  style={sharedStyles.dpAcquired}
                  placeholder={STRINGS.BookForm.dpAcquired.placeholder}
                  label={STRINGS.BookForm.dpAcquired.label}
                />
                <AppDropDown
                  widgetId={'ddFormat'}
                  options={[
                    {
                      label: STRINGS.BookForm.ddFormat.options.opt0.label,
                      value: 'Hardcover',
                    },
                    {
                      label: STRINGS.BookForm.ddFormat.options.opt1.label,
                      value: 'Paperback',
                    },
                    {
                      label: STRINGS.BookForm.ddFormat.options.opt2.label,
                      value: 'Ebook',
                    },
                    {
                      label: STRINGS.BookForm.ddFormat.options.opt3.label,
                      value: 'Audiobook',
                    },
                  ]}
                  placeholder={STRINGS.BookForm.ddFormat.placeholder}
                  label={STRINGS.BookForm.ddFormat.label}
                  searchPlaceholder={
                    STRINGS.BookForm.ddFormat.searchPlaceholder
                  }
                />
                <AppTextField
                  widgetId={'inIsbn10'}
                  style={sharedStyles.emailField}
                  label={STRINGS.BookForm.inIsbn10.label}
                  accessibilityLabel={
                    STRINGS.BookForm.inIsbn10.accessibilityLabel
                  }
                  placeholder={STRINGS.BookForm.inIsbn10.placeholder}
                />
                <AppTextField
                  widgetId={'inIsbn13'}
                  style={sharedStyles.emailField}
                  placeholder={STRINGS.BookForm.inIsbn13.placeholder}
                  label={STRINGS.BookForm.inIsbn13.label}
                  accessibilityLabel={
                    STRINGS.BookForm.inIsbn13.accessibilityLabel
                  }
                />
                <AppDropDown
                  widgetId={'ddLanguage'}
                  options={[
                    {
                      label: STRINGS.BookForm.ddLanguage.options.opt0.label,
                      value: 'English',
                    },
                    {
                      label: STRINGS.BookForm.ddLanguage.options.opt1.label,
                      value: 'Spanish',
                    },
                    {
                      label: STRINGS.BookForm.ddLanguage.options.opt2.label,
                      value: 'French',
                    },
                    {
                      label: STRINGS.BookForm.ddLanguage.options.opt3.label,
                      value: 'German',
                    },
                    {
                      label: STRINGS.BookForm.ddLanguage.options.opt4.label,
                      value: 'Italian',
                    },
                    {
                      label: STRINGS.BookForm.ddLanguage.options.opt5.label,
                      value: 'Portuguese',
                    },
                    {
                      label: STRINGS.BookForm.ddLanguage.options.opt6.label,
                      value: 'Japanese',
                    },
                  ]}
                  placeholder={STRINGS.BookForm.ddLanguage.placeholder}
                  label={STRINGS.BookForm.ddLanguage.label}
                  searchPlaceholder={
                    STRINGS.BookForm.ddLanguage.searchPlaceholder
                  }
                />
                <AppTextField
                  widgetId={'inPages'}
                  style={sharedStyles.emailField}
                  accessibilityLabel={
                    STRINGS.BookForm.inPages.accessibilityLabel
                  }
                  label={STRINGS.BookForm.inPages.label}
                  placeholder={STRINGS.BookForm.inPages.placeholder}
                />
                <AppDropDown
                  widgetId={'ddReadStatus'}
                  options={[
                    {
                      label: STRINGS.BookForm.ddReadStatus.options.opt0.label,
                      value: 'notRead',
                    },
                    {
                      label: STRINGS.BookForm.ddReadStatus.options.opt1.label,
                      value: 'inProgress',
                    },
                    {
                      label: STRINGS.BookForm.ddReadStatus.options.opt2.label,
                      value: 'Read',
                    },
                  ]}
                  placeholder={STRINGS.BookForm.ddReadStatus.placeholder}
                  label={STRINGS.BookForm.ddReadStatus.label}
                  searchPlaceholder={
                    STRINGS.BookForm.ddReadStatus.searchPlaceholder
                  }
                />
                <AppDatePicker
                  widgetId={'dpReadStart'}
                  style={sharedStyles.dpAcquired}
                  placeholder={STRINGS.BookForm.dpReadStart.placeholder}
                  label={STRINGS.BookForm.dpReadStart.label}
                />
                <AppDatePicker
                  widgetId={'dpReadFinish'}
                  style={sharedStyles.dpAcquired}
                  label={STRINGS.BookForm.dpReadFinish.label}
                  placeholder={STRINGS.BookForm.dpReadFinish.placeholder}
                />
                <AppSlider widgetId={'slRating'} style={sharedStyles.rating} />
                <AppTextField
                  widgetId={'inTags'}
                  style={sharedStyles.emailField}
                  placeholder={STRINGS.BookForm.inTags.placeholder}
                  accessibilityLabel={
                    STRINGS.BookForm.inTags.accessibilityLabel
                  }
                  label={STRINGS.BookForm.inTags.label}
                />
                <AppTextField
                  widgetId={'inReview'}
                  style={sharedStyles.emailField}
                  label={STRINGS.BookForm.inReview.label}
                  placeholder={STRINGS.BookForm.inReview.placeholder}
                  accessibilityLabel={
                    STRINGS.BookForm.inReview.accessibilityLabel
                  }
                />
              </AppColumn>
              <AppRow
                widgetId={'formActions'}
                spacing={space['2']}
                style={sharedStyles.actionBar}
              >
                <AppButton
                  widgetId={'btnSaveBook'}
                  onPress={() => {
                    onPressSavebtnSaveBook();
                  }}
                  style={sharedStyles.btnEditAuthor}
                  loading={saveBookLoading}
                  accessibilityLabel={
                    STRINGS.BookForm.btnSaveBook.accessibilityLabel
                  }
                  label={STRINGS.BookForm.btnSaveBook.label}
                />
                <AppButton
                  widgetId={'btnCancelBook'}
                  onPress={() => {
                    onPressCancelbtnCancelBook();
                  }}
                  style={sharedStyles.btnCancelAuthor}
                  textStyle={[
                    text.label.medium,
                    sharedStyles.btnCancelAuthorText,
                  ]}
                  accessibilityLabel={
                    STRINGS.BookForm.btnCancelBook.accessibilityLabel
                  }
                  label={STRINGS.BookForm.btnCancelBook.label}
                />
              </AppRow>
            </AppColumn>
          );
        }}
      </ASForm>
    </AppContainer>
  );
};

const styles = StyleSheet.create({});

export default BookForm;
