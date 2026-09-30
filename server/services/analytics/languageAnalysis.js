function languageAnalyse(repos){
    const languages = {};

    repos.forEach(repo => {
        if(!repo.language){
            return;
        }

        if(!languages[repo.language]){
            languages[repo.language] = {
                count :0,
                lastUsed : repo.updated_at
            };
        }

        languages[repo.language].count++;

        if(new Date(repo.updated_at) > languages[repo.language].lastUsed){
            languages[repo.language].lastUsed = repo.updated_at;
        }
    });

    return languages;
}

module.exports = languageAnalyse