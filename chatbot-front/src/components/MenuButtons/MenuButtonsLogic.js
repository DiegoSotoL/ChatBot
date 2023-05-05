export const menus = {
    mainMenu: ['Certificado', 'Asesor'],
    menuCertificado1: ['Certificado 1.1', 'Certificado 1.2'],
    menuCertificado2: ['Certificado 1.1.1', 'Certificado 1.1.2'],
    menuCertificado3: ['Certificado 1.2.1', 'Certificado 1.2.2'],
    menuAsesor1: ['Asesor 1.1', 'Asesor 1.2'],
    menuAsesor2: ['Asesor 1.1.1', 'Asesor 1.1.2'],
    menuAsesor3: ['Asesor 1.2.1', 'Asesor 1.2.2'],
};

export function getNextMenu(messageText, currentMenuKey) {
    const nextMenuMapping = {
        mainMenu: {
            Certificado: 'menuCertificado1',
            Asesor: 'menuAsesor1',
        },
        menuCertificado1: {
            'Certificado 1.1': 'menuCertificado2',
            'Certificado 1.2': 'menuCertificado3',
        },
        menuCertificado2: {
            'Certificado 1.1.1': null,
            'Certificado 1.1.2': null,
        },
        menuCertificado3: {
            'Certificado 1.2.1': null,
            'Certificado 1.2.2': null,
        },
        menuAsesor1: {
            'Asesor 1.1': 'menuAsesor2',
            'Asesor 1.2': 'menuAsesor3',
        },
        menuAsesor2: {
            'Asesor 1.1.1': null,
            'Asesor 1.1.2': null,
        },
        menuAsesor3: {
            'Asesor 1.2.1': null,
            'Asesor 1.2.2': null,
        },
        // Agrega aquí los mapeos de los demás menús si es necesario
    };

    const currentMenuOptions = menus[currentMenuKey];
    const selectedOption = currentMenuOptions.find(option => option.toLowerCase().trim() === messageText.toLowerCase().trim());

    if (selectedOption) {
        let response = nextMenuMapping[currentMenuKey][selectedOption];
        return response;
    }

    return null;
}
