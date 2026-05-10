import { useState, useEffect } from 'react'
import { fetchPoem } from '../services/api'
import './PoemCard.css'

/**
 * 诗词卡片组件 - 动态获取并展示诗词内容
 */
function PoemCard({ poemId = 'maozedong-1' }) {
  const [poem, setPoem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPoem = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPoem(poemId)
        setPoem(data)
      } catch (err) {
        setError('加载诗词失败，请稍后重试')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPoem()
  }, [poemId])

  if (loading) {
    return (
      <div className="poem-card loading">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="poem-card error">
        <p>{error}</p>
      </div>
    )
  }

  if (!poem) {
    return null
  }

  return (
    <div className="poem-card">
      <div className="poem-header">
        <h2 className="poem-title">{poem.title}</h2>
        <div className="poem-meta">
          <span className="author">{poem.author}</span>
          <span className="dynasty">{poem.dynasty}</span>
          {poem.createdYear && <span className="year">{poem.createdYear}年</span>}
        </div>
      </div>

      <div className="poem-content">
        {poem.content.map((line, index) => (
          <p key={index} className={line === '' ? 'empty-line' : ''}>
            {line}
          </p>
        ))}
      </div>

      {poem.description && (
        <div className="poem-description">
          <h3>赏析</h3>
          <p>{poem.description}</p>
        </div>
      )}

      {poem.tags && poem.tags.length > 0 && (
        <div className="poem-tags">
          {poem.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default PoemCard
