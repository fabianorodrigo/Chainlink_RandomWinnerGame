/**
 *  we want a game object where data is ordered by Id(which is the gameId) in decending order
 *  and we want the first game from this ordered data
 * @returns
 */
export function FETCH_CREATED_GAME() {
  return `query {
          games(orderBy:id, orderDirection:desc, first: 1) {
              id
              maxPlayers
              entryFee
              winner
              players
          }
      }`;
}
