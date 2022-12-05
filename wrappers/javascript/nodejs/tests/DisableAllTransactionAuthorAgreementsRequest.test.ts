import type { IndyVdrPool } from 'indy-vdr-nodejs'

import { DID, setupPool } from './utils'

import { DisableAllTransactionAuthorAgreementsRequest } from 'indy-vdr-nodejs'

describe('DisableAllTransactionsAuthorAgreementRequest', () => {
  let pool: IndyVdrPool

  beforeAll(() => (pool = setupPool()))

  test('Submit request', async () => {
    const request = new DisableAllTransactionAuthorAgreementsRequest({ submitterDid: DID })

    await expect(pool.submitRequest(request)).rejects.toThrowError('MissingSignature()')
  })
})
