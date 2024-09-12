import { useEffect } from "react";
import { useState } from "react";
import NewsItem from "./NewsItem";
import { Axios } from "axios";

async function fetchData(category, key) {
    console.log({ category, key })
    const url = `http://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${key}`
    try {
        const res = await fetch(url)
        console.log(res)
    } catch (err) {
        console.log("error", err)
    }
}


const NewsBoard = ({ category }) => {
    const [articles, setArticles] = useState([]);
    // useEffect(() => {
    //     console.log("calling in use effect")
    //     console.log("environments", import.meta.env)
    //     // fetchData(category, import.meta.env.VITE_API_KEY)
    // }, [category])
    useEffect(() => {
        let url = `http://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        fetch(url, { method: 'GET' }).then(response => response.json()).then(data => setArticles(data.articles));
    }, [category])
    return (
        <div>
            <h2 className="text-center">Latest<span className="badge bg-danger">News</span></h2>
            {articles.map((news, index) => {
                return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
            })}
        </div>
    )
}

export default NewsBoard