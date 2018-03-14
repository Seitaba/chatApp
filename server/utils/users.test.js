const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'React'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'Node'
        }];
    });
});