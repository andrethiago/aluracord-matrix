import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';



function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                    ${Tag} {
                        color: ${appConfig.theme.colors.neutrals[200]};
                        font-size: 24px;
                        font-weight: 600;
                    }
            `}</style>
        </>
    );
}

// Component React
/*function HomePage() {
    // JSX
    return (
        <div>
            <GlobalStyle />
            <Title tag="h2">Boas vindas de volta!</Title>
            <h2>Discord - Alura Matrix</h2>
        </div>
    )
}

export default HomePage;*/

export default function PaginaInicial() {
    //const username = 'andrethiago';
    const [username, setUsername] = React.useState('andrethiago');
    const roteamento = useRouter();
    const [avatar, setAvatar] = React.useState('andrethiago');
    const [bio, setBio] = React.useState('');

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[100],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            console.log('submit do form')
                            roteamento.push('/chat');
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h1">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        {/*<input 
                            type="text"
                            value={username}
                            onChange={function (event) {
                                console.log('usuário digitou', event.target.value);
                                // onde está o valor
                                const valor = event.target.value;
                                // trocar o valor da variável
                                setUsername(valor)
                            }}/>*/}

                        <TextField
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                            value={username}
                            onChange={function (event) {
                                const valor = event.target.value;
                                setUsername(valor);
                                if(valor.length > 2) {
                                    const url = `https://api.github.com/users/${valor}`
                                    console.log(url)
                                    return fetch(url)
                                        .then((response) => {
                                            if (response.ok) {
                                                setAvatar(valor);
                                                return response.json();
                                            } else {
                                                setAvatar()
                                                return Promise.reject('some other error: ' + response.status)
                                            }
                                        })
                                        .then((responseJson) => {
                                            setBio(responseJson.bio);
                                        })
                                        .catch((error) => {
                                            console.error('deu erro', error);
                                        });
                                }
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${avatar}.png`}
                            title={`${bio}`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}