// https://github.com/leoforfree/cz-customizable/edit/master/cz-config-EXAMPLE.js
const standard = require('./.versionrc.json');
module.exports = {
    types: standard.types.map(st => ({
        value: st.type,
        name: st.section,
    })),
    scopes: [{ name: 'dm' }, { name: 'ge' }, { name: 'jsf' }],
    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: 'TICKET-',
    ticketNumberRegExp: '\\d{1,5}',
    messages: {
        type: "Select the type of change that you're committing:",
        scope: '\nDenote the SCOPE of this change (optional):',
        // used if allowCustomScopes is true
        customScope: 'Denote the SCOPE of this change:',
        subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
        body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
        breaking: 'List any BREAKING CHANGES (optional):\n',
        footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
        confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },

    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    skipQuestions: ['body'],
    subjectLimit: 100,
};
