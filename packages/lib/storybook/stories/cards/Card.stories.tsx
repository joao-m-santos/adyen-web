import { MetaConfiguration, PaymentMethodStoryProps, StoryConfiguration } from '../types';
import { getStoryContextCheckout } from '../../utils/get-story-context-checkout';
import { CardConfiguration } from '../../../src/components/Card/types';
import { Card } from '../../../src';
import { Container } from '../Container';
import { searchFunctionExample } from '../../../../playground/src/utils';
import { CardWith3DS2Redirect } from './cardStoryHelpers/CardWith3DS2Redirect';

type CardStory = StoryConfiguration<CardConfiguration>;

const meta: MetaConfiguration<CardConfiguration> = {
    title: 'Cards/Card'
};

const createComponent = (args: PaymentMethodStoryProps<CardConfiguration>, context) => {
    const { componentConfiguration } = args;
    const checkout = getStoryContextCheckout(context);
    const card = new Card(checkout, componentConfiguration);

    return <Container element={card} />;
};

export const Default: CardStory = {
    render: createComponent,
    args: {
        componentConfiguration: {
            _disableClickToPay: true,
            autoFocus: true,
            // brands: ['mc'],
            // brandsConfiguration: { visa: { icon: 'http://localhost:3000/nocard.svg', name: 'altVisa' } },
            challengeWindowSize: '02',
            // configuration: {socialSecurityNumberMode: 'auto'}
            // data: {
            //     holderName: 'J. Smith'
            // },
            disableIOSArrowKeys: false,
            // disclaimerMessage,
            // doBinLookup: false,
            enableStoreDetails: false,
            // exposeExpiryDate: true,
            forceCompat: false,
            hasHolderName: false,
            holderNameRequired: false,
            hideCVC: false,
            // keypadFix: false,
            legacyInputMode: false,
            maskSecurityCode: false,
            minimumExpiryDate: null, // e.g. '11/24'
            // name: '', // Affects Dropin only
            placeholders: {}, // e.g. { holderName: 'B Bob' }
            positionHolderNameOnTop: false,
            showBrandIcon: true,
            showContextualElement: true
            // showPayButton: false,
            // styles: { base: { fontWeight: 300 } },
        }
    }
};

export const WithAVS: CardStory = {
    render: createComponent,
    args: {
        componentConfiguration: {
            _disableClickToPay: true,
            billingAddressRequired: true,
            billingAddressAllowedCountries: ['US', 'CA', 'GB'],
            // billingAddressRequiredFields: ['postalCode', 'country'],
            data: {
                billingAddress: {
                    street: 'Virginia Street',
                    postalCode: '95014',
                    city: 'Cupertino',
                    houseNumberOrName: '1',
                    country: 'US',
                    stateOrProvince: 'CA'
                }
            }
        }
    }
};

export const WithPartialAVS: CardStory = {
    render: createComponent,
    args: {
        componentConfiguration: {
            _disableClickToPay: true,
            billingAddressRequired: true,
            billingAddressMode: 'partial'
        }
    }
};

export const WithAVSAddressLookup: CardStory = {
    render: createComponent,
    args: {
        componentConfiguration: {
            _disableClickToPay: true,
            billingAddressRequired: true,
            onAddressLookup: searchFunctionExample
        }
    }
};

export const WithInstallments: CardStory = {
    render: createComponent,
    args: {
        componentConfiguration: {
            _disableClickToPay: true,
            showInstallmentAmounts: true,
            installmentOptions: {
                mc: {
                    values: [1, 2, 3]
                },
                visa: {
                    values: [1, 2, 3, 4],
                    plans: ['regular', 'revolving']
                }
            }
        }
    }
};

export const KCP: CardStory = {
    render: createComponent,
    args: {
        componentConfiguration: {
            ...{ brands: ['mc', 'visa', 'amex', 'bcmc', 'maestro', 'korean_local_card'] },
            _disableClickToPay: true,
            // Set koreanAuthenticationRequired AND countryCode so KCP fields show at start
            // Just set koreanAuthenticationRequired if KCP fields should only show if korean_local_card entered
            configuration: {
                koreanAuthenticationRequired: true
            },
            countryCode: 'KR'
        }
    }
};

export const WithClickToPay: CardStory = {
    render: createComponent,
    args: {
        componentConfiguration: {
            clickToPayConfiguration: {
                shopperEmail: 'gui.ctp@adyen.com',
                merchantDisplayName: 'Adyen Merchant Name'
            }
        }
    }
};

export const CardWith_3DS2_Redirect: CardStory = {
    render: args => {
        return <CardWith3DS2Redirect contextArgs={args} />;
    },
    args: {
        componentConfiguration: {
            _disableClickToPay: true
        },
        useSessions: false
    }
};

export default meta;
