import html from "html-literal";

export default st => html`
<section id="home">
  <div class="intro-paragraph">
    <p>This is the home page</p>
    </div>
    </div>
  </div>
</section>`;

// <!-- another title to be placed here --> before line 5
// <!-- Weather in ${st.weather.city} ${kelvinToFahrenheit(st.weather.temp)}F, feels
// like ${kelvinToFahrenheit(st.weather.feelsLike)}F -->
