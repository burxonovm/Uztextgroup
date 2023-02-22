import { Link } from 'react-router-dom'
import './newsPage.css'
import { AiOutlineRight } from 'react-icons/ai'
import { articleList } from './data'
import { useState, useEffect } from "react";
import Block from "../components/Block/block";
import { FetchService } from '../Services/FetchService';
import NewsDetails from '../components/NewsDetails/NewsDetails';
const NewsPage = () => {
  const [apiNews, setApiNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    FetchService
      .GetAsync(`/api/news`)
      .then(res => setApiNews(res.data))
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }, []);
  console.log(apiNews);
  return (
    <div className='newspage-wrapper'>
      <Block state={isLoading} />
      <div className="header-back"></div>
      <div className="news-page-heading">
        <div className="container">
          <p className='news-heading-text'>So'ngi yangiliklar</p>
          <div className="news-article-list">
            {
              apiNews.map(({ id, title, date, description }) => (
                <div className="news-article-item" key={id}>
                  <Link to = {`/news-detail/${id}`} className='article-link'>
                    <div className="article-img-box">
                      <img
                        src={`${FetchService.axios.defaults.baseURL}/uploads/${id}${localStorage.getItem("lang") ?? "uz"}.jpg`}
                        alt={title} />
                    </div>
                    <div className="news-article-body">
                      <p className="article-date">Yangiliklar <span>{new Date(date).toLocaleDateString()}</span></p>
                      <p className="article-title-text">
                        {title}
                      </p>
                      <p className="article-body-text">
                        {description}
                      </p>
                      <Link to={`/news-detail/${id}`} className='article-more-btn'>
                        <span>BATAFSIL</span> <AiOutlineRight />
                      </Link>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsPage