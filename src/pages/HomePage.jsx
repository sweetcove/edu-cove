import { useState, useEffect } from 'react'
import { fetchKnowledgeData } from '../services/api'
import './HomePage.css'

/**
 * 知识传递平台首页 - 让智慧跨越时空，让知识温暖人心
 */
function HomePage() {
  const [knowledgeData, setKnowledgeData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('literature')
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('categories')

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchKnowledgeData()
        setKnowledgeData(data)
        // 默认选中第一个子分类
        if (data.categories.length > 0 && data.categories[0].subcategories.length > 0) {
          setSelectedSubcategory(data.categories[0].subcategories[0].id)
        }
      } catch (error) {
        console.error('Failed to load knowledge data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const currentCategory = knowledgeData?.categories.find(c => c.id === selectedCategory)
  const currentSubcategory = currentCategory?.subcategories.find(s => s.id === selectedSubcategory)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-header">
            <div className="brand-logo">
              <div className="logo-icon"></div>
              <span className="logo-text">萃煊</span>
            </div>
            <div className="hero-tagline">
              <p className="hero-subtitle">承前人之智，拓万象之境</p>
              <p className="hero-motto">传承 · 探索 · 创新</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="navigation-section">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            📚 知识分类
          </button>
          <button 
            className={`nav-tab ${activeTab === 'recommendation' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendation')}
          >
             每日推荐
          </button>
          <button 
            className={`nav-tab ${activeTab === 'rankings' ? 'active' : ''}`}
            onClick={() => setActiveTab('rankings')}
          >
            🏆 排行榜
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content">
        {!loading && knowledgeData && (
          <>
            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="categories-view">
                {/* Category Navigation */}
                <div className="category-nav">
                  {knowledgeData.categories.map((category) => (
                    <button
                      key={category.id}
                      className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        if (category.subcategories.length > 0) {
                          setSelectedSubcategory(category.subcategories[0].id)
                        }
                      }}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-name">{category.name}</span>
                    </button>
                  ))}
                </div>

                {/* Subcategory Navigation */}
                {currentCategory && currentCategory.subcategories.length > 0 && (
                  <div className="subcategory-nav">
                    {currentCategory.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        className={`subcategory-btn ${selectedSubcategory === sub.id ? 'active' : ''}`}
                        onClick={() => setSelectedSubcategory(sub.id)}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Content List */}
                {currentSubcategory && (
                  <div className="content-list">
                    <div className="content-header">
                      <h2>{currentSubcategory.name}</h2>
                      <p className="content-count">共 {currentSubcategory.items.length} 篇</p>
                    </div>
                    <div className="content-grid">
                      {currentSubcategory.items.map((item) => (
                        <div key={item.id} className="content-card">
                          <div className="content-title">{item.title}</div>
                          <div className="content-author">{item.author}</div>
                          <div className="content-excerpt">{item.excerpt}</div>
                          <div className="content-footer">
                            <div className="content-tags">
                              {item.tags.map((tag, index) => (
                                <span key={index} className="content-tag">{tag}</span>
                              ))}
                            </div>
                            <div className="content-stats">
                              <span className="views"> {item.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Daily Recommendation Tab */}
            {activeTab === 'recommendation' && (
              <div className="recommendation-view">
                <div className="section-title">
                  <h2>每日推荐</h2>
                  <p>今日精选 · {knowledgeData.dailyRecommendation.date}</p>
                </div>
                <div className="recommendation-card">
                  <div className="recommendation-badge">每日精选</div>
                  <div className="recommendation-category">{knowledgeData.dailyRecommendation.category}</div>
                  <h3 className="recommendation-title">{knowledgeData.dailyRecommendation.title}</h3>
                  <div className="recommendation-author">{knowledgeData.dailyRecommendation.author}</div>
                  <div className="recommendation-excerpt">{knowledgeData.dailyRecommendation.excerpt}</div>
                  <div className="recommendation-description">{knowledgeData.dailyRecommendation.description}</div>
                  <div className="recommendation-tags">
                    {knowledgeData.dailyRecommendation.tags.map((tag, index) => (
                      <span key={index} className="recommendation-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Rankings Tab */}
            {activeTab === 'rankings' && (
              <div className="rankings-view">
                <div className="section-title">
                  <h2>知识排行榜</h2>
                  <p>最受欢迎的知识内容</p>
                </div>
                <div className="rankings-list">
                  {knowledgeData.rankings.map((item) => (
                    <div key={item.rank} className={`ranking-item rank-${item.rank}`}>
                      <div className="ranking-number">
                        {item.rank === 1 ? (
                          <span className="medal medal-1"></span>
                        ) : item.rank === 2 ? (
                          <span className="medal medal-2">🥈</span>
                        ) : item.rank === 3 ? (
                          <span className="medal medal-3"></span>
                        ) : (
                          <span className="number">{item.rank}</span>
                        )}
                      </div>
                      <div className="ranking-content">
                        <div className="ranking-title">{item.title}</div>
                        <div className="ranking-meta">
                          <span className="ranking-author">{item.author}</span>
                          <span className="ranking-category">{item.category}</span>
                        </div>
                      </div>
                      <div className="ranking-stats">
                        <span className="ranking-views">👁 {item.views.toLocaleString()}</span>
                        <span className={`ranking-trend trend-${item.trend}`}>
                          {item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '️'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 知识传递平台. All rights reserved.</p>
        <p>致力于分享优质知识资源</p>
      </footer>
    </div>
  )
}

export default HomePage
