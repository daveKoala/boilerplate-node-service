import { expect } from 'chai';
import { removeAllObjectIds } from './removeAllObjectIds';

// npm run test:local -- --grep removeAllObjectIds

describe('removeAllObjectIds: remove Object ID, _createdAt and _updatedAt from an object', () => {
  it('It removes top level id and created / updated at fields', () => {
    const raw = {
      name: 'your name',
      _id: 'qwerty',
      _createdAt: '2021-11-01',
      _updatedAt: '2021-11-02',
    };
    const solution = {
      name: 'your name',
    };

    expect(removeAllObjectIds(raw)).to.be.eqls(solution);
  });

  it('It removes nested object id and created / updated at fields', () => {
    const raw = {
      name: 'your name',
      _id: 'qwerty',
      _createdAt: '2021-11-01',
      _updatedAt: '2021-11-02',
      author: { name: 'kirk', _id: 'qwerty' },
    };
    const solution = {
      name: 'your name',
      author: { name: 'kirk' },
    };

    expect(removeAllObjectIds(raw)).to.be.eqls(solution);
  });

  it('It removes nested array object id and created / updated at fields', () => {
    const raw = {
      name: 'your name',
      _id: 'qwerty',
      _createdAt: '2021-11-01',
      _updatedAt: '2021-11-02',
      author: { name: 'kirk', _id: 'qwerty' },
      readers: [
        { name: 'kirk', _id: 'qwertya' },
        { name: 'spock', _id: 'qwertyb' },
        { name: 'mccoy', _id: 'qwertyc' },
      ],
    };
    const solution = {
      author: { name: 'kirk' },
      name: 'your name',
      readers: [{ name: 'kirk' }, { name: 'spock' }, { name: 'mccoy' }],
    };

    expect(removeAllObjectIds(raw)).to.deep.equal(solution);
  });
});
