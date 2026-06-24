import React from 'react';
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

import { StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { useGlobalContext } from '@/context';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const Dashboard: React.FC<ScreenProps> = ({ route }) => {
  const { globalData } = useGlobalContext();

  const navigation = useNavigation();

  const onPressBooksList = async () => {
    navigation.navigate(Route.BOOK_DETAILS, {});
  };

  const onPressAddBookbtnAddBook = async () => {
    navigation.navigate(Route.BOOK_FORM, {});
  };

  useClearHeaderActions(navigation);

  const renderItem_booksList = ({ item }) => (
    <AppRow
      widgetId={'bookListItem'}
      spacing={space['2']}
      style={sharedStyles.authorItemTemplate}
    >
      <AppRow widgetId={'leadingBlock'} style={sharedStyles.avatarRow}>
        <AppImage
          widgetId={'coverThumb'}
          source={imageSources.image__94a3}
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
            accessibilityLabel={STRINGS.Dashboard.bookTitle.accessibilityLabel}
          >
            {String(
              item['bookTitle'] ??
                STRINGS.Dashboard.bookTitle.accessibilityLabel,
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
              item['bookSubtitle'] ??
                STRINGS.Dashboard.bookSubtitle.accessibilityLabel,
            )}
          </AppText>
        </AppColumn>
      </AppRow>
      <AppRow widgetId={'trailingBlock'} style={sharedStyles.avatarRow}>
        <AppBadge widgetId={'statusBadge'} />
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
  );

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
              onPress={() => {
                onPressBooksList({});
              }}
              style={sharedStyles.authorsList}
              renderItem={renderItem_booksList}
              data={globalData?.books}
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
          onPressAddBookbtnAddBook({});
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
