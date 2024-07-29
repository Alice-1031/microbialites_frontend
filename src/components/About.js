import React from 'react';
import '../assets/css/About.css';

function About() {
  return (
    <div className="about">
      <p><strong>About</strong></p>
      <p>
        The microbialites database originated as a way for me to keep track of all
        of the data associated with my microbialites project in Nevada. I realized
        very quickly that I needed to be able to track hundreds of photos, from
        outcrop to SEM scale; hundreds of waypoints; hundreds to thousands of
        geochemical results; and all of the metadata associated with these data.
        I originally built an MS Access database from the seat of my pants. I had
        little or no experience with MS Access, so I taught myself along the way.
        After building this personal database, I thought that this would be
        something that the sedimentology, geomicrobiology, and astrobiology
        community might find useful, particularly if it could expand and grow.
      </p>
      <p>
        In the early 2010s I participated in a workshop to help develop the
        sedimentology and stratigraphy part of <a href="https://strabospot.org/">Strabospot</a>,
        a truly amazing new effort to bring field data collection to the geological
        community. Then, in 2020, under the aegis of the Government of Western
        Australia's Department of Energy, Mines, Industry Regulation and Safety
        and the Geological Survey of Western Australia, Stan Awramik and Kathleen
        Grey published their <a href="https://www.dmp.wa.gov.au/Geological-Survey/Handbook-for-the-study-and-26950.aspx">
        "Handbook for the Study and Description of Microbialites"</a>, a synoptic
        and non-genetic classification of microbialite morphologies, textures, and
        geological context. This handbook was free to the public for download and
        provided under a <a href="https://creativecommons.org/licenses/by/4.0/legalcode">
        Creative Commons Attribution 4.0 International Licence</a>, meaning I was
        free to make use of images and text as long as I provided attribution. This
        database relies heavily on this resource and I greatly appreciate both the
        Western Australian Geological Survey and the author's efforts in
        constructing and making this handbook available. Most folks that work with
        or on microbialites will agree that the field is a morass of jargon, mostly
        unstandardized, and this handbook makes a huge leap forward in terms of
        trying to resolve this issue.
      </p>
      <p>
        Armed with my experience with Strabospot and this new handbook, I believed
        the time was right to try to build a publicly-available database that allows
        workers to explore and contribute to the vast knowledge on microbialites.
        I am not a Javascript coder. I can hack through CSS and HTML. But modern
        web design and database development is well beyond my capacity. As a result,
        I have worked with a team of Computer and Information Science undergraduate
        students to construct this database. My guiding principles are:
      </p>
      <ul>
        <li>It must be open source and easily available to the public.</li>
        <li>It must have both a geographic and a logical/hierarchical interface for searches.</li>
        <li>It must be relatively easy to use.</li>
        <li>APIs must be available for other database entities to incorporate and interact with it (e.g. <a href="https://strabospot.org/">Strabospot</a> and <a href="https://macrostrat.org/">Macrostrat</a>).</li>
        <li>It must be based on a non-genetic terminology with a sound, peer-reviewed basis.</li>
        <li>It must be image-rich.</li>
        <li>It must have the capability to have multiple users that can contribute to the database.</li>
        <li>It must be open to change over time and not remain static.</li>
      </ul>
      <p>
        So, this database is very much a work in progress. I hope to get it hosted by
        a larger, more permanent entity at some later date (NSF? NASA? GSA?). For now,
        it is paid for by the <a href="https://one.stthomas.edu/sites/schools-colleges/college-of-arts-sciences/cas-earth-environment-and-society/SitePage/74218/home">
        Department of Earth, Environment and Society at the University of St. Thomas</a>.
        The database is hosted on <a href="https://heroku.com">Heroku</a> and the images
        are hosted on <a href="https://azure.microsoft.com/en-us">Microsoft Azure</a>
        in blob storage. It can all be containerized using <a href="https://www.docker.com/">Docker</a>
        and moved to another platform, if that eventually happens.
      </p>
      <p>_____________________________________</p>
      <p>
        Grey, K and Awramik, SM. 2020, Handbook for the study and description of
        microbialites: Geological Survey of Western Australia, Bulletin 147, 278p.
      </p>
    </div>
  );
}

export default About;


