function getLanguageFromFile(filename){
    const extension = filename.split('.').pop().toLowerCase();

    const languageMap = {
        js: 'JavaScript',
        jsx: 'JavaScript',
        ts: 'TypeScript',
        tsx: 'TypeScript',
        py: 'Python',
        java: 'Java',
        cpp: 'C++',
        c: 'C',
        cs: 'C#',
        go: 'Go',
        rs: 'Rust',
        php: 'PHP',
        rb: 'Ruby',
        html: 'HTML',
        css: 'CSS'
    };

    return languageMap[extension] || null;
}

function getLanguagesFromFiles(files){
    const languages = [];

    files.forEach(file =>{
        const language = getLanguageFromFile(file.filename);

        if(language && !languages.includes(language)){
            languages.push(language);
        }
    })

    return languages;
}

module.exports = {
    getLanguageFromFile,
    getLanguagesFromFiles
}