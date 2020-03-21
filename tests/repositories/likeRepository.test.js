import likeRepository from '../../src/repositories/likeRepository'

/**
 * Testing is Liked function for users that are not liked each other
 */
test('Testing is liked', async(done) => {
    const user_id = 100
    const follower_id = 20
    const isLiked = await likeRepository.isLiked({user_id, follower_id})
    
    expect(isLiked).toBeNull()
    done()
})