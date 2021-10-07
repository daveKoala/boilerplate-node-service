import { expect } from 'chai';
import ValidId from './index';

// npm run test:unit:console -- --grep ObjectId

describe('ObjectId: string is a valid Object ID', () => {
  it('Its is a valid id', () => {
    const id = '615ed9bc3ee7e868b7c5fcf4';

    expect(ValidId(id)).to.be.true;
  });
  it('Its is NOT a valid id', () => {
    const id = '5cc9bc109321f00311e551XX';

    expect(ValidId(id)).to.be.false;
  });
  it('NULL is NOT a valid id', () => {
    const nullString = null as unknown as string;
    expect(ValidId(nullString)).to.be.false;
  });
});
