import { useEffect, useState, useCallback  } from "react";

const imageStyle = {
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
};

export default function ContentRecommendations() {
    const recommendations = useContentRecommendations()

    return (
      <>
        <script
          className="idio-recommendations"
          data-api-key={process.env.NEXT_PUBLIC_CONTENT_RECS_kEY}
          data-rpp="5"
          type="text/x-mustache"
        />

        {recommendations.length > 0 && (
          <div>
            <ul className="divided">
                <ContentRecommendationsList recommendations={recommendations} />
            </ul>
          </div>
        )}
      </>
    )
  }

  function ContentRecommendationsList({ recommendations }) {
    const formatDate = (date) =>
      new Date(date).toLocaleString('en', { dateStyle: 'medium' })

    return recommendations.map((recommendation) => (
        <li  key={recommendation.id}>
            <article className="box excerpt" >
                <header>
                    <span className="date">
                        {formatDate(recommendation.published)}
                    </span>
                        <h3>
                            <a href="#">
                            {recommendation.title}
                            </a>
                        </h3>
                    </header>
                <p>
                    <img alt={recommendation.title} src={recommendation.main_image_url}  style={imageStyle} />
                </p>
                <p>{recommendation.abstract}</p>
            </article>
      </li>
    ))
  }

  function useContentRecommendations() {
    const [recommendations, setRecommendations] = useState([])

    useIdioProxy(setRecommendations)
    useIdioPersonalizationScript()

    return recommendations
  }


  function useIdioProxy(setRecommendations) {
    const handleAjaxResponse = useCallback(
      (data, statusCode) => {
        if (statusCode !== 200) {
          return
        }

        setRecommendations(data.content)
      },
      [setRecommendations]
    )

    useEffect(() => {
      window.idio = new Proxy(
        {},
        {
          get(target, property) {
            return property === 'r0' ? handleAjaxResponse : target[property]
          },
        }
      )

      return () => delete window.idio
    }, [handleAjaxResponse])
  }


  function useIdioPersonalizationScript() {
    useEffect(() => {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://s.idio.co/ip.js'

      document
        .querySelector('script')
        .insertAdjacentElement('beforebegin', script)

      return () => script.remove()
    }, [])
  }