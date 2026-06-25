import React, { useEffect } from 'react';
import {
  AppBadge,
  AppColumn,
  AppContainer,
  AppFloatingActionButton,
  AppImage,
  AppRow,
  AppText,
} from '@/components/shared';
import { useNavigation } from '@react-navigation/native';

import { imageSources, space, text, radius } from '@/assets';

import { ASListView } from '@/components';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { AppContextData, useAppContext, useBookWorkflows } from '@/context';
import { BookEntity, mapBookApiToEntity } from '@/utils/book.mappers';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const Dashboard: React.FC<ScreenProps> = ({ route }) => {
  const { appContext, setAppContext } = useAppContext();
  const { getBooks, booksLoading } = useBookWorkflows();

  const navigation = useNavigation<any>();

  const books = Array.isArray(appContext.entities?.book?.data)
    ? appContext.entities.book.data
    : [];

  const onPressBooksList = async (selectedBook: BookEntity) => {
    setAppContext((ctx: AppContextData) => ({
      ...ctx,
      entities: {
        ...ctx.entities,
        book: {
          ...ctx.entities.book,
          selected: selectedBook,
        },
      },
    }));
    navigation.navigate(Route.BOOK_DETAILS, {});
  };

  const onPressAddBookbtnAddBook = async () => {
    setAppContext((ctx: AppContextData) => ({
      ...ctx,
      entities: {
        ...ctx.entities,
        book: {
          ...ctx.entities.book,
          action: 'add',
          selected: null,
          draft: {},
        },
      },
    }));
    navigation.navigate(Route.BOOK_FORM, {});
  };

  useClearHeaderActions(navigation);

  useEffect(() => {
    let isMounted = true;
    getBooks()
      .then((response) => {
        if (!isMounted || !response) return;
        const items = Array.isArray(response.items)
          ? response.items.map((item) => mapBookApiToEntity(item as BookEntity))
          : [];
        setAppContext((ctx: AppContextData) => ({
          ...ctx,
          entities: {
            ...ctx.entities,
            book: {
              ...ctx.entities.book,
              data: items,
            },
          },
        }));
      })
      .catch((error) => {
        if (__DEV__) {
          console.error('[Dashboard] Failed to load books:', error);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [getBooks, setAppContext]);

  const renderItem_booksList = ({ item }: { item: Record<string, unknown> }) => {
    const book = mapBookApiToEntity(item as BookEntity);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        testID={'bookListItemPressable'}
        onPress={() => onPressBooksList(book)}
      >
        <AppRow
          widgetId={'bookListItem'}
          spacing={space['2']}
          style={sharedStyles.authorItemTemplate}
        >
          <AppRow widgetId={'leadingBlock'} style={sharedStyles.avatarRow}>
            <AppImage
              widgetId={'coverThumb'}
              source={
                typeof book.coverImageUrl === 'string'
                  ? book.coverImageUrl
                  : imageSources.image__94a3
              }
              style={styles.coverThumbStyle}
            />
            <AppColumn
              widgetId={'titleColumn'}
              spacing={20}
              style={sharedStyles.buttonContainer}
            >
              <AppText
                widgetId={'bookTitle'}
                style={[text.title.small, sharedStyles.authCountry]}
                accessibilityLabel={
                  STRINGS.Dashboard.bookTitle.accessibilityLabel
                }
              >
                {String(
                  book.title ?? STRINGS.Dashboard.bookTitle.accessibilityLabel,
                )}
              </AppText>
              <AppText
                widgetId={'bookSubtitle'}
                style={[text.body.small, sharedStyles.authBirth]}
                accessibilityLabel={
                  STRINGS.Dashboard.bookSubtitle.accessibilityLabel
                }
              >
                {String(
                  book.authorName ??
                    book.publisher ??
                    STRINGS.Dashboard.bookSubtitle.accessibilityLabel,
                )}
              </AppText>
            </AppColumn>
          </AppRow>
          <AppRow widgetId={'trailingBlock'} style={sharedStyles.avatarRow}>
            <AppBadge
              widgetId={'statusBadge'}
              label={book.readStatus ? String(book.readStatus) : undefined}
              children={null}
            />
            <AppText
              widgetId={'chevron'}
              style={[text.body.small, sharedStyles.authBirth]}
              accessibilityLabel={STRINGS.Dashboard.chevron.accessibilityLabel}
            >
              {String(
                item['chevron'] ?? STRINGS.Dashboard.chevron.accessibilityLabel,
              )}
            </AppText>
          </AppRow>
        </AppRow>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <AppContainer
        widgetId={'ASContainer-420290'}
        testID={'b080f036-4305-45de-865b-f23b09748495'}
        style={sharedStyles.container2}
      >
        <AppColumn
          widgetId={'_rootcontainer'}
          spacing={space['6']}
          style={sharedStyles.rootcontainer}
        >
          <AppRow widgetId={'headerRow'} style={sharedStyles.avatarRow}>
            <AppText
              widgetId={'hdrBooks'}
              style={[text.heading.large, sharedStyles.authCountry]}
              accessibilityLabel={STRINGS.Dashboard.hdrBooks.accessibilityLabel}
            >
              {STRINGS.Dashboard.hdrBooks.label}
            </AppText>
          </AppRow>
          <AppColumn
            widgetId={'listSection'}
            spacing={space['5']}
            style={sharedStyles.contentArea}
          >
            <ASListView
              itemSpacing={8}
              orientation={'vertical'}
              showsHorizontalScrollIndicator={false}
              name={'booksList'}
              style={sharedStyles.authorsList}
              renderItem={renderItem_booksList}
              data={books as Record<string, unknown>[]}
              loading={booksLoading}
              testId={'booksList'}
            />
          </AppColumn>
          <AppColumn
            widgetId={'fabHolder'}
            spacing={space['5']}
            style={sharedStyles.headerSection}
          />
        </AppColumn>
      </AppContainer>
      <AppFloatingActionButton
        widgetId={'btnAddBook'}
        icon={'add'}
        onPress={() => {
          onPressAddBookbtnAddBook();
        }}
        style={sharedStyles.btnAddAuthor}
        label={STRINGS.Dashboard.btnAddBook.label}
      />
    </>
  );
};

const styles = StyleSheet.create({
  coverThumbStyle: {
    height: 56,
    overflow: 'hidden',
    width: 56,
    borderRadius: radius.sm,
    objectFit: 'contain',
    flexBasis: 'auto',
  },
});

export default Dashboard;
