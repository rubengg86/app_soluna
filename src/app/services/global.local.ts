export const GLOBAL = {
    appVersion: '2.0.0',
    url: 'http://192.168.1.19:8080/api',
    solunaUrl: 'http://192.168.1.19:8081',
    passwordSeed: 's0lun4rul3sb1tch',
    tpvUrl: 'https://sis-t.redsys.es:25443/sis/realizarPago',
    merchants : {
        5: {
            merchantCode: '355780867',
            sha: 'fDLuzLwM+YeG45hyQbAhZRV8JNvPRpZY'
        },
        9: {
            merchantCode: '363064700',
            sha: 'grJcg44MzJQkfRjRn8ASUDfD/PeEusdY'
            //sha: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7'
        },
        1: {
            merchantCode: '352828222',
            sha: 'V/BDOvX2jEJwnPhDItNsmaNP9vZMr/Kp'
        }
    },
    shaProdAviles: 'fDLuzLwM+YeG45hyQbAhZRV8JNvPRpZY', // Deprecated
    shaProdGijon: 'grJcg44MzJQkfRjRn8ASUDfD/PeEusdY', // Deprecated
    shaProdFlorida: 'V/BDOvX2jEJwnPhDItNsmaNP9vZMr/Kp', // Deprecated
};
