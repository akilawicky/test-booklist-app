import React from 'react';
import {
  AppColumn,
  AppContainer,
  AppFloatingActionButton,
  AppImage,
  AppRow,
  AppText,
} from '@/components/shared';
import { useNavigation } from '@react-navigation/native';

import { color, imageSources, space, text } from '@/assets';

import { ASListView, ASIconButton, ASDivider } from '@/components';

import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { AppContextData, useAppContext, useGlobalContext } from '@/context';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const AuthorList: React.FC<ScreenProps> = ({ route }) => {
  const { globalData } = useGlobalContext();
  const { setAppContext } = useAppContext();

  const navigation = useNavigation();

  const onPressAuthorsList = (item: any) => {
    setAppContext((ctx: AppContextData) => ({
      ...ctx,
      entities: {
        ...ctx.entities,
        author: {
          ...ctx.entities.author,
          action: 'edit',
          selected: item,
          draft: null,
        },
      },
    }));
    navigation.navigate(Route.AUTHOR_FORM, {});
  };

  const onPressAddAuthorbtnAddAuthor = async () => {
    setAppContext((ctx: AppContextData) => ({
      ...ctx,
      entities: {
        ...ctx.entities,
        author: {
          ...ctx.entities.author,
          action: 'add',
          selected: null,
          draft: null,
        },
      },
    }));
    navigation.navigate(Route.AUTHOR_FORM, {});
  };

  useClearHeaderActions(navigation);

  const renderItem_authorsList = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      testID={'authorListItemPressable'}
      onPress={() => onPressAuthorsList(item)}
    >
      <AppRow
        widgetId={'author_itemTemplate'}
        spacing={12}
        style={sharedStyles.authorItemTemplate}
      >
        <AppImage
          widgetId={'authorAvatar_item'}
          source={imageSources.image__ho0nc}
          style={styles.authorAvatarItemStyle}
        />
        <AppColumn
          widgetId={'authorTexts_item'}
          spacing={space['5']}
          style={sharedStyles.headerSection}
        >
          <AppText
            widgetId={'authorName_item'}
            numberOfLines={1}
            style={[text.title.small, sharedStyles.authCountry]}
            accessibilityLabel={
              STRINGS.AuthorList.authorName_item.accessibilityLabel
            }
          >
            {String(
              item['authorName_item'] ??
                STRINGS.AuthorList.authorName_item.accessibilityLabel,
            )}
          </AppText>
          <AppText
            widgetId={'authorCountry_item'}
            numberOfLines={1}
            style={[text.body.small, sharedStyles.authBirth]}
          >
            {String(item['authorCountry_item'])}
          </AppText>
        </AppColumn>
        <ASIconButton
          iconColor={color.text.primary}
          icon={'chevron_right'}
          size={32}
          name={'authorChevron_item'}
          iconStyles={styles.authorChevronItemIconStyles}
          containerStyle={styles.authorChevronItemContainerStyle}
          style={sharedStyles.emailFieldPrefixText}
          testId={'authorChevron_item'}
          onPress={() => onPressAuthorsList(item)}
        />
        <ASDivider
          name={'authorDivider_item'}
          style={sharedStyles.authorDividerItem}
          testId={'authorDivider_item'}
        />
      </AppRow>
    </TouchableOpacity>
  );

  return (
    <>
      <AppContainer
        widgetId={'ASContainer-112867'}
        testID={'b4eb568a-2a8a-498a-98be-0f5252ea88ec'}
        style={sharedStyles.container2}
      >
        <AppColumn
          widgetId={'_rootcontainer'}
          spacing={space['6']}
          style={sharedStyles.rootcontainer}
        >
          <AppText
            widgetId={'hdrAuthors'}
            style={[text.title.large, sharedStyles.authCountry]}
            accessibilityLabel={
              STRINGS.AuthorList.hdrAuthors.accessibilityLabel
            }
          >
            {STRINGS.AuthorList.hdrAuthors.label}
          </AppText>
          <AppColumn
            widgetId={'mainSection'}
            spacing={space['5']}
            style={sharedStyles.contentArea}
          >
            <ASListView
              itemSpacing={8}
              orientation={'vertical'}
              showsHorizontalScrollIndicator={false}
              name={'authorsList'}
              style={sharedStyles.authorsList}
              renderItem={renderItem_authorsList}
              data={globalData?.authors}
              testId={'authorsList'}
            />
          </AppColumn>
        </AppColumn>
      </AppContainer>
      <AppFloatingActionButton
        widgetId={'btnAddAuthor'}
        icon={'person_add'}
        onPress={() => {
          onPressAddAuthorbtnAddAuthor({});
        }}
        style={sharedStyles.btnAddAuthor}
        label={STRINGS.AuthorList.btnAddAuthor.label}
      />
    </>
  );
};

const styles = StyleSheet.create({
  authorAvatarItemStyle: {
    width: 40,
    borderRadius: 20,
    height: 40,
    overflow: 'hidden',
    objectFit: 'contain',
    flexBasis: 'auto',
  },
  authorChevronItemIconStyles: { flexShrink: 0, flexGrow: 0 },
  authorChevronItemContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({ web: { display: 'flex' }, default: {} }),
  },
});

export default AuthorList;
