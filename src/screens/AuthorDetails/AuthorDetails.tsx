import React from 'react';
import {
  AppBadge,
  AppButton,
  AppColumn,
  AppContainer,
  AppImage,
  AppRow,
  AppText,
} from '@/components/shared';
import { useNavigation } from '@react-navigation/native';

import { imageSources, space, text, color } from '@/assets';

import { ASDivider, ASSpacer } from '@/components';

import { Platform, StyleSheet } from 'react-native';
import { sharedStyles } from '@/components/shared/sharedStyles';

import Route from '@/navigation/routes';
import { useClearHeaderActions } from '@/utils/screen.effects';
import { cloneDeep } from 'lodash';
import { useAppContext, AppContextData } from '@/context';

import { useEntityResolver } from '@/utils/entity.utils';

import { STRINGS } from '@/strings';

type ScreenRouteParams = {};

type ScreenProps = {
  route: {
    params: ScreenRouteParams;
  };
};

const AuthorDetails: React.FC<ScreenProps> = ({ route }) => {
  const { setAppContext } = useAppContext();

  const navigation = useNavigation();

  const resolveCurrentEntityItem = useEntityResolver();

  const onPressEditbtnEditAuthor = async () => {
    const selectedauthor = resolveCurrentEntityItem('author');

    setAppContext((ctx: AppContextData) => ({
      ...ctx,
      entities: {
        ...ctx.entities,
        author: {
          ...ctx.entities.author,
          action: 'edit',
          selected: selectedauthor,
          draft: selectedauthor ? cloneDeep(selectedauthor) : {},
        },
      },
    }));
  };

  const onPressDeletebtnDeleteAuthor = async () => {
    navigation.navigate(Route.AUTHOR_LIST, {});
  };

  useClearHeaderActions(navigation);

  return (
    <AppContainer
      widgetId={'ASContainer-664552'}
      testID={'3f1ac151-54fb-4d7a-8d0b-ee67173bc9ca'}
      style={sharedStyles.container2}
    >
      <AppColumn
        widgetId={'_rootcontainer'}
        spacing={space['6']}
        style={sharedStyles.rootcontainer}
      >
        <AppColumn
          widgetId={'header'}
          spacing={space['6']}
          style={sharedStyles.header}
        >
          <AppImage
            widgetId={'authorAvatar'}
            source={imageSources.image__w5wq}
            style={sharedStyles.authorAvatar}
          />
          <AppText
            widgetId={'authName'}
            style={[text.title.medium, sharedStyles.authCountry]}
            accessibilityLabel={
              STRINGS.AuthorDetails.authName.accessibilityLabel
            }
          >
            {STRINGS.AuthorDetails.authName.label}
          </AppText>
          <AppRow widgetId={'metaRow'} style={sharedStyles.avatarRow}>
            <AppRow widgetId={'metaBadges'} style={sharedStyles.avatarRow}>
              <AppBadge
                widgetId={'authorCountryBadge'}
                label={STRINGS.AuthorDetails.authorCountryBadge.label}
              />
              <AppBadge
                widgetId={'authorDatesBadge'}
                label={STRINGS.AuthorDetails.authorDatesBadge.label}
              />
            </AppRow>
          </AppRow>
        </AppColumn>
        <AppColumn
          widgetId={'details'}
          spacing={space['5']}
          style={sharedStyles.contentArea}
        >
          <AppText
            widgetId={'authPen'}
            style={[text.body.medium, sharedStyles.authCountry]}
            accessibilityLabel={
              STRINGS.AuthorDetails.authPen.accessibilityLabel
            }
          >
            {STRINGS.AuthorDetails.authPen.label}
          </AppText>
          <AppText
            widgetId={'authCountry'}
            style={[text.body.medium, sharedStyles.authCountry]}
            accessibilityLabel={
              STRINGS.AuthorDetails.authCountry.accessibilityLabel
            }
          >
            {STRINGS.AuthorDetails.authCountry.label}
          </AppText>
          <AppText
            widgetId={'authBirth'}
            style={[text.body.small, sharedStyles.authBirth]}
            accessibilityLabel={
              STRINGS.AuthorDetails.authBirth.accessibilityLabel
            }
          >
            {STRINGS.AuthorDetails.authBirth.label}
          </AppText>
          <AppText
            widgetId={'authDeath'}
            accessibilityLabel={''}
            style={[text.body.small, sharedStyles.authBirth]}
          >
            {`undefined`}
          </AppText>
          <AppText
            widgetId={'authWebsite'}
            style={[text.body.medium, styles.authWebsiteStyle]}
            accessibilityLabel={
              STRINGS.AuthorDetails.authWebsite.accessibilityLabel
            }
          >
            {STRINGS.AuthorDetails.authWebsite.label}
          </AppText>
          <ASDivider
            name={'dividerTop'}
            style={sharedStyles.authorDividerItem}
            testId={'dividerTop'}
          />
          <AppText
            widgetId={'bio'}
            style={[text.label.medium, sharedStyles.bio]}
            accessibilityLabel={STRINGS.AuthorDetails.bio.accessibilityLabel}
          >
            {STRINGS.AuthorDetails.bio.label}
          </AppText>
          <ASDivider
            name={'notesDivider'}
            style={sharedStyles.authorDividerItem}
            testId={'notesDivider'}
          />
          <AppText
            widgetId={'notesA'}
            style={[text.label.medium, sharedStyles.bio]}
            accessibilityLabel={STRINGS.AuthorDetails.notesA.accessibilityLabel}
          >
            {STRINGS.AuthorDetails.notesA.label}
          </AppText>
          <ASSpacer
            name={'spacerAboveButtons'}
            style={styles.spacerAboveButtonsStyle}
            testId={'spacerAboveButtons'}
          />
          <AppColumn
            widgetId={'actionButtons'}
            spacing={space['2']}
            style={sharedStyles.actionBar}
          >
            <AppButton
              widgetId={'btnEditAuthor'}
              onPress={() => {
                onPressEditbtnEditAuthor({});
              }}
              style={sharedStyles.btnEditAuthor}
              label={STRINGS.AuthorDetails.btnEditAuthor.label}
              accessibilityLabel={
                STRINGS.AuthorDetails.btnEditAuthor.accessibilityLabel
              }
            />
            <AppButton
              widgetId={'btnDeleteAuthor'}
              onPress={() => {
                onPressDeletebtnDeleteAuthor({});
              }}
              style={sharedStyles.btnDeleteAuthor}
              accessibilityLabel={
                STRINGS.AuthorDetails.btnDeleteAuthor.accessibilityLabel
              }
              label={STRINGS.AuthorDetails.btnDeleteAuthor.label}
            />
          </AppColumn>
        </AppColumn>
      </AppColumn>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  authWebsiteStyle: {
    color: color.brand.primary,
    overflow: 'visible',
    textAlign: 'left',
    ...Platform.select({ web: { whiteSpace: 'pre-wrap' }, default: {} }),
  },
  spacerAboveButtonsStyle: { height: space['6'], width: space['6'] },
});

export default AuthorDetails;
