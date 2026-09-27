function languageAnalyse(repos){
    const count = {}
    repos.forEach(repo => {
        if(repo.language === null){
        return;
        }
        if(!count[repo.language]){
        count[repo.language]=0;
        }
        count[repo.language]++;
    });
    return count;
}

module.exports = languageAnalyse