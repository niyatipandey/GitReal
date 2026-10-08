function languageRecency(commits) {
    const lastUsed = {};

    commits.forEach(commit => {
        commit.languages.forEach(language => {
            if(!lastUsed[language] || new Date(commit.date) > new Date(lastUsed[language])){
                lastUsed[language] = commit.date;
            }
        })
    });

    return lastUsed;
}

module.exports = languageRecency