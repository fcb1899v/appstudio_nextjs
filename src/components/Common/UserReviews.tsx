import type { NextPage } from 'next'
import { CSSProperties } from 'react'
import { isPC, myApp, myAppNumber } from '@/utils/constants'

/**
 * Interface for user reviews component props
 * Defines the properties required for rendering user reviews
 */
interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Component for displaying user reviews
 * Shows a list of user feedback and ratings for each app
 * @param appNumber - App identifier for dynamic content
 * @param width - Screen width for responsive design
 * @param isJa - Language preference (Japanese or English)
 */
const UserReviews: NextPage<Props> = ({appNumber, width, isJa}) => {
  /**
   * Get reviews data for each app
   * Returns localized review data based on app number and language
   * @returns Array of review objects for the current app
   */
  const getReviews = () => {
    const reviews = {
      [myAppNumber.elevator]: [
        {
          name: isJa ? "田中さん" : "Tanaka",
          rating: 5,
          comment: isJa ? "子供が大喜び！エレベーターの音も本物みたいで感動しました。" : "My kids love it! The elevator sounds are so realistic, amazing!",
          date: isJa ? "2024年1月" : "Jan 2024"
        },
        {
          name: isJa ? "佐藤さん" : "Sato",
          rating: 5,
          comment: isJa ? "1000ボタンモードが最高！子供と一緒に楽しんでいます。" : "The 1000 buttons mode is amazing! Having fun with my kids.",
          date: isJa ? "2024年2月" : "Feb 2024"
        },
        {
          name: isJa ? "山田さん" : "Yamada",
          rating: 5,
          comment: isJa ? "生成AIで作られた画像が美しく、子供の想像力を刺激します。" : "The AI-generated images are beautiful and stimulate children's imagination.",
          date: isJa ? "2024年3月" : "Mar 2024"
        }
      ],
      [myAppNumber.elevatorNeo]: [
        {
          name: isJa ? "鈴木さん" : "Suzuki",
          rating: 5,
          comment: isJa ? "ネオ版はさらにリアル！AI技術の進歩を実感できます。" : "The Neo version is even more realistic! You can feel the AI technology progress.",
          date: isJa ? "2024年4月" : "Apr 2024"
        },
        {
          name: isJa ? "高橋さん" : "Takahashi",
          rating: 5,
          comment: isJa ? "カスタマイズ機能が豊富で、毎日新しい発見があります。" : "Rich customization features, discovering something new every day.",
          date: isJa ? "2024年5月" : "May 2024"
        }
      ],
      [myAppNumber.crossing]: [
        {
          name: isJa ? "渡辺さん" : "Watanabe",
          rating: 5,
          comment: isJa ? "撮り鉄体験が楽しい！4カ国の踏切が無料で体験できるのが最高。" : "The train photography experience is fun! Love that 4 countries are free.",
          date: isJa ? "2024年6月" : "Jun 2024"
        }
      ],
      [myAppNumber.toilet]: [
        {
          name: isJa ? "伊藤さん" : "Ito",
          rating: 5,
          comment: isJa ? "トイレの音が本物みたい！子供が喜んでいます。" : "The toilet sounds are so realistic! My kids love it.",
          date: isJa ? "2024年7月" : "Jul 2024"
        }
      ],
      [myAppNumber.allowance]: [
        {
          name: isJa ? "小林さん" : "Kobayashi",
          rating: 5,
          comment: isJa ? "かわいいデザインで子供も大人も使いやすい！" : "Cute design, easy to use for both kids and adults!",
          date: isJa ? "2024年8月" : "Aug 2024"
        }
      ],
      [myAppNumber.phonics]: [
        {
          name: isJa ? "加藤さん" : "Kato",
          rating: 5,
          comment: isJa ? "フォニックスの学習に最適！150単語以上で充実しています。" : "Perfect for phonics learning! Over 150 words, very comprehensive.",
          date: isJa ? "2024年9月" : "Sep 2024"
        }
      ],
      [myAppNumber.japanese]: [
        {
          name: isJa ? "吉田さん" : "Yoshida",
          rating: 5,
          comment: isJa ? "ひらがな・カタカナの学習に最適！180単語以上で楽しく学べます。" : "Perfect for hiragana/katakana learning! Over 180 words, fun to learn.",
          date: isJa ? "2024年10月" : "Oct 2024"
        }
      ]
    }
    
    return reviews[appNumber] || []
  }

  const reviews = getReviews()
  
  // Return null if no reviews are available for this app
  if (reviews.length === 0) {
    return null
  }

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px 20px',
    background: myApp(width, isJa)[appNumber].color.features,
  }

  const titleStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: isPC(width) ? 32 : 24,
    fontWeight: 'bold',
    color: myApp(width, isJa)[appNumber].color.title,
    marginBottom: 40,
  }

  const reviewsContainerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isPC(width) ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr',
    gap: 20,
    marginTop: 20,
  }

  const reviewCardStyle: CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }

  const starStyle: CSSProperties = {
    color: '#FFD700',
    fontSize: 18,
    marginBottom: 10,
  }

  const commentStyle: CSSProperties = {
    fontSize: isPC(width) ? 16 : 14,
    lineHeight: 1.6,
    color: myApp(width, isJa)[appNumber].color.message,
    marginBottom: 15,
    fontStyle: 'italic',
  }

  const userInfoStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    color: myApp(width, isJa)[appNumber].color.message,
    opacity: 0.8,
  }

  /**
   * Render star rating display
   * @param rating - Number of stars (1-5)
   * @returns String of filled and empty stars
   */
  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        {isJa ? 'ユーザーレビュー' : 'User Reviews'}
      </h2>
      
      <div style={reviewsContainerStyle}>
        {reviews.map((review, index) => (
          <div 
            key={index} 
            style={reviewCardStyle}
            className="hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <div style={starStyle}>
              {renderStars(review.rating)}
            </div>
            <p style={commentStyle}>
              &ldquo;{review.comment}&rdquo;
            </p>
            <div style={userInfoStyle}>
              <span>{review.name}</span>
              <span>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserReviews 