exports.seed = function(knex, Promise)
{
    return knex('posts')
    .insert(
        [
            {
                url: "https://www.nytimes.com/2020/07/26/books/review-ghosting-news-local-journalism-democracy-crisis-margaret-sullivan.html"
            },
            {
                url: "https://www.bbc.com/news/technology-53567681"
            },
            {
                url: "https://www.nbcnews.com/news/us-news/14-texas-family-test-positive-coronavirus-after-small-gathering-1-n1234980"
            }
        ]
    )
}

