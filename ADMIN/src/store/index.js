import { createStore } from 'vuex'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    setPersistence,
    browserLocalPersistence,
    signOut,
    browserSessionPersistence,
    sendPasswordResetEmail,
    updatePassword,
    verifyPasswordResetCode,
    confirmPasswordReset
    // inMemoryPersistence,
} from "firebase/auth";


// Create a new store instance.
const store = createStore({
    state: {
        user: {
            data: null,
        },
        error: null,
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            const auth = getAuth();
            return createUserWithEmailAndPassword(auth, user.email, user.password)
                .then(() => {
                    return updateProfile(auth.currentUser, {
                        displayName: user.name
                    }).then(() => {
                        return commit("setUser", auth.currentUser)
                    }).catch((error) => {

                    });
                })
                .catch((error) => {
                    return commit("setError", error.code)

                });
        },
        login({ commit }, user) {
            const auth = getAuth();

            return setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    return signInWithEmailAndPassword(auth, user.email, user.password)
                        .then((userCredential) => {
                            return commit("setUser", userCredential.user)
                        })
                        .catch((error) => {
                            return commit("setError", error.code)
                        });

                })
                .catch((error) => {
                    return commit("setError", error.code)
                });

        },
        logout({ commit }) {
            const auth = getAuth();
            return signOut(auth).then(() => {
                return commit("logout")
            })
        },
        forgot({ commit }, user) {
            const auth = getAuth();
            return sendPasswordResetEmail(auth, user.email)
                .then((ret) => {
                    return true
                })
                .catch((error) => {
                    return false

                });
        },
        reset({ commit }, user) {
            const auth = getAuth();
            return verifyPasswordResetCode(auth, user.oobCode)
                .then((email) => {
                    return confirmPasswordReset(auth, user.oobCode, user.password)
                        .then((resp) => {
                            return { error: false, msg: 'Senha trocada com sucesso!' }
                        }).catch((error) => {
                            commit("setError", error.code)
                            return { error: true, msg: this.state.error }
                        });
                }).catch((error) => {
                    commit("setError", error.code)
                    return { error: true, msg: this.state.error }
                });
        },
        getUser({ commit }) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                commit("setUser", user)
            });
        },
    },
    mutations: {
        logout: (state) => {
            state.user.data = null
            return state.user.data
        },
        setUser: (state, userData) => {
            state.user.data = userData
            return state.user.data
        },
        setError: (state, error) => {
            //ERRORS FIREBASE
            const errors = {
                'auth/app-deleted': 'O banco de dados n??o foi localizado.',
                'auth/expired-action-code': 'O c??digo da a????o o ou link expirou.',
                'auth/invalid-action-code': 'O c??digo da a????o ?? inv??lido. Isso pode acontecer se o c??digo estiver malformado ou j?? tiver sido usado.',
                'auth/user-disabled': 'O usu??rio correspondente ?? credencial fornecida foi desativado.',
                'auth/user-not-found': 'Usu??rio e/ou senha inv??lido(s).',
                'auth/weak-password': 'Sua senha deve ter pelo menos 8 caracteres.',
                'auth/email-already-in-use': 'J?? existi uma conta com o endere??o de email fornecido.',
                'auth/invalid-email': 'O endere??o de e-mail n??o ?? v??lido.',
                'auth/operation-not-allowed': 'O tipo de conta correspondente ?? esta credencial, ainda n??o encontra-se ativada.',
                'auth/account-exists-with-different-credential': 'E-mail j?? associado a outra conta.',
                'auth/auth-domain-config-required': 'A configura????o para autentica????o n??o foi fornecida.',
                'auth/credential-already-in-use': 'J?? existe uma conta para esta credencial.',
                'auth/operation-not-supported-in-this-environment': 'Esta opera????o n??o ?? suportada no ambiente que est?? sendo executada. Verifique se deve ser http ou https.',
                'auth/timeout': 'Excedido o tempo de resposta. O dom??nio pode n??o estar autorizado para realizar opera????es.',
                'auth/missing-android-pkg-name': 'Deve ser fornecido um nome de pacote para instala????o do aplicativo Android.',
                'auth/missing-continue-uri': 'A pr??xima URL deve ser fornecida na solicita????o.',
                'auth/missing-ios-bundle-id': 'Deve ser fornecido um nome de pacote para instala????o do aplicativo iOS.',
                'auth/invalid-continue-uri': 'A pr??xima URL fornecida na solicita????o ?? inv??lida.',
                'auth/unauthorized-continue-uri': 'O dom??nio da pr??xima URL n??o est?? na lista de autoriza????es.',
                'auth/invalid-dynamic-link-domain': 'O dom??nio de link din??mico fornecido, n??o est?? autorizado ou configurado no projeto atual.',
                'auth/argument-error': 'Verifique a configura????o de link para o aplicativo.',
                'auth/invalid-persistence-type': 'O tipo especificado para a persist??ncia dos dados ?? inv??lido.',
                'auth/unsupported-persistence-type': 'O ambiente atual n??o suportar o tipo especificado para persist??ncia dos dados.',
                'auth/invalid-credential': 'A credencial expirou ou est?? mal formada.',
                'auth/wrong-password': 'Usu??rio e/ou senha inv??lido(s)',
                'auth/invalid-verification-code': 'O c??digo de verifica????o da credencial n??o ?? v??lido.',
                'auth/invalid-verification-id': 'O ID de verifica????o da credencial n??o ?? v??lido.',
                'auth/custom-token-mismatch': 'O token est?? diferente do padr??o solicitado.',
                'auth/invalid-custom-token': 'O token fornecido n??o ?? v??lido.',
                'auth/captcha-check-failed': 'O token de resposta do reCAPTCHA n??o ?? v??lido, expirou ou o dom??nio n??o ?? permitido.',
                'auth/invalid-phone-number': 'O n??mero de telefone est?? em um formato inv??lido (padr??o E.164).',
                'auth/missing-phone-number': 'O n??mero de telefone ?? requerido.',
                'auth/quota-exceeded': 'A cota de SMS foi excedida.',
                'auth/cancelled-popup-request': 'Somente uma solicita????o de janela pop-up ?? permitida de uma s?? vez.',
                'auth/popup-blocked': 'A janela pop-up foi bloqueado pelo navegador.',
                'auth/popup-closed-by-user': 'A janela pop-up foi fechada pelo usu??rio sem concluir o login no provedor.',
                'auth/unauthorized-domain': 'O dom??nio do aplicativo n??o est?? autorizado para realizar opera????es.',
                'auth/invalid-user-token': 'O usu??rio atual n??o foi identificado.',
                'auth/user-token-expired': 'O token do usu??rio atual expirou.',
                'auth/null-user': 'O usu??rio atual ?? nulo.',
                'auth/app-not-authorized': 'Aplica????o n??o autorizada para autenticar com a chave informada.',
                'auth/invalid-api-key': 'A chave da API fornecida ?? inv??lida.',
                'auth/network-request-failed': 'Falha de conex??o com a rede.',
                'auth/requires-recent-login': 'O ??ltimo hor??rio de acesso do usu??rio n??o atende ao limite de seguran??a.',
                'auth/too-many-requests': 'As solicita????es foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.',
                'auth/web-storage-unsupported': 'O navegador n??o suporta armazenamento ou se o usu??rio desativou este recurso.',
                'auth/invalid-claims': 'Os atributos de cadastro personalizado s??o inv??lidos.',
                'auth/claims-too-large': 'O tamanho da requisi????o excede o tamanho m??ximo permitido de 1 Megabyte.',
                'auth/id-token-expired': 'O token informado expirou.',
                'auth/id-token-revoked': 'O token informado perdeu a validade.',
                'auth/invalid-argument': 'Um argumento inv??lido foi fornecido a um m??todo.',
                'auth/invalid-creation-time': 'O hor??rio da cria????o precisa ser uma data UTC v??lida.',
                'auth/invalid-disabled-field': 'A propriedade para usu??rio desabilitado ?? inv??lida.',
                'auth/invalid-display-name': 'O nome do usu??rio ?? inv??lido.',
                'auth/invalid-email-verified': 'O e-mail ?? inv??lido.',
                'auth/invalid-hash-algorithm': 'O algoritmo de HASH n??o ?? uma criptografia compat??vel.',
                'auth/invalid-hash-block-size': 'O tamanho do bloco de HASH n??o ?? v??lido.',
                'auth/invalid-hash-derived-key-length': 'O tamanho da chave derivada do HASH n??o ?? v??lido.',
                'auth/invalid-hash-key': 'A chave de HASH precisa ter um buffer de byte v??lido.',
                'auth/invalid-hash-memory-cost': 'O custo da mem??ria HASH n??o ?? v??lido.',
                'auth/invalid-hash-parallelization': 'O carregamento em paralelo do HASH n??o ?? v??lido.',
                'auth/invalid-hash-rounds': 'O arredondamento de HASH n??o ?? v??lido.',
                'auth/invalid-hash-salt-separator': 'O campo do separador de SALT do algoritmo de gera????o de HASH precisa ser um buffer de byte v??lido.',
                'auth/invalid-id-token': 'O c??digo do token informado n??o ?? v??lido.',
                'auth/invalid-last-sign-in-time': 'O ??ltimo hor??rio de login precisa ser uma data UTC v??lida.',
                'auth/invalid-page-token': 'A pr??xima URL fornecida na solicita????o ?? inv??lida.',
                'auth/invalid-password': 'A senha ?? inv??lida, precisa ter pelo menos 6 caracteres.',
                'auth/invalid-password-hash': 'O HASH da senha n??o ?? v??lida.',
                'auth/invalid-password-salt': 'O SALT da senha n??o ?? v??lido.',
                'auth/invalid-photo-url': 'A URL da foto de usu??rio ?? inv??lido.',
                'auth/invalid-provider-id': 'O identificador de provedor n??o ?? compat??vel.',
                'auth/invalid-session-cookie-duration': 'A dura????o do COOKIE da sess??o precisa ser um n??mero v??lido em milissegundos, entre 5 minutos e 2 semanas.',
                'auth/invalid-uid': 'O identificador fornecido deve ter no m??ximo 128 caracteres.',
                'auth/invalid-user-import': 'O registro do usu??rio a ser importado n??o ?? v??lido.',
                'auth/invalid-provider-data': 'O provedor de dados n??o ?? v??lido.',
                'auth/maximum-user-count-exceeded': 'O n??mero m??ximo permitido de usu??rios a serem importados foi excedido.',
                'auth/missing-hash-algorithm': '?? necess??rio fornecer o algoritmo de gera????o de HASH e seus par??metros para importar usu??rios.',
                'auth/missing-uid': 'Um identificador ?? necess??rio para a opera????o atual.',
                'auth/reserved-claims': 'Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.',
                'auth/session-cookie-revoked': 'O COOKIE da sess??o perdeu a validade.',
                'auth/uid-alread-exists': 'O indentificador fornecido j?? est?? em uso.',
                'auth/email-already-exists': 'O e-mail fornecido j?? est?? em uso.',
                'auth/phone-number-already-exists': 'O telefone fornecido j?? est?? em uso.',
                'auth/project-not-found': 'Nenhum projeto foi encontrado.',
                'auth/insufficient-permission': 'A credencial utilizada n??o tem permiss??o para acessar o recurso solicitado.',
                'auth/internal-error': 'O servidor de autentica????o encontrou um erro inesperado ao tentar processar a solicita????o.'
            }
            state.error = !!errors[error] ? errors[error] : 'Erro n??o catalogado - ' + error
        },
    },
    modules: {},
})

export default store