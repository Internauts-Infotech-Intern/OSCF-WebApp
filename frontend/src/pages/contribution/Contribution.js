import React from "react";
import img1 from "../../images/img1.avif";
import img2 from "../../images/img2.avif";
import "./Contribution.css";

function Contribution() {
  return (
    <div className="MyContent px-5">
      <img src={img1}></img>
      <h1>What are Open Source Projects?</h1>
      <p>
        Open Source is a term used to describe software whose original source
        code is freely available, can be redistributed, and also modified. Open
        Source embodies a spirit of collaboration, transparency, and
        community-oriented contributions, among other things.
      </p>

      <h1>1. Find a project you're interested in </h1>
      <p>
        Finding a project you're interested in seems like an easy task; you just
        find an interesting project and contribute, right? Wrong! The difficulty
        of the issues might put you off from getting started and choosing a
        project you like (happened to me!) 😅 As a beginner to programming or
        open source in general, it's very easy to get discouraged and not even
        dip your toes in these waters. This said, finding a project that
        interests you is the first step, and the most crucial. It will motivate
        you to actually contribute and to become an active member of the open
        source community! What helped me decide was to think about a project I
        wanted to do, and see if someone else did it. Do they need help? Can you
        improve it? Can you implement your ideas to the project? Or... Is there
        a specific project you're really passionate about? Is there a project
        you want to be part of?
      </p>

      <h1> 2. Filter out issues ☝️</h1>
      <p>
        Filter out issues with tags or labels on Github! Doing this will make
        your search much easier. As a beginner, I'd search for good first issues
        or something simple like bug fix. These tags will have simple issues
        that are most likely beginner friendly. You can search these on the
        search bar too! On the image below, once you click on the issues tab on
        the navbar from a repository, you can click on labels and find a tag
        that interests you.
      </p>
      <img src={img2}></img>

      <h1>3. Meet your project 👋</h1>
      <p>
        Before you contribute, you gotta make sure to know a bit about the
        project first. Don't forget to go through the README.md and the
        contributing guidelines before you contribute! In my opinion, this is a
        crucial step; you inform yourself about the project and learn how you
        can properly contribute in a way that's helpful to the project, instead
        of a way you think might be helpful.
      </p>

      <h1>4. Get assigned 👩‍🏫</h1>
      <p>
        This is mostly optional, but I noticed that maintainers tend to be more
        involved when it comes to projects that are smaller in scale.
        Personally, I think that this might be a better option for people that
        are first starting to contribute....a little guidance ain't hurt
        nobody!!😉 Once you choose an issue you want to work on, ask the
        maintainer to get assigned through the comments!
      </p>

      <h1>5. Fork, clone, & run the project locally🍴</h1>
      <p>
        Smaller issues like grammar in documentation don't really require you to
        go through this step. You can just edit it on Github itself. However,
        you will most likely be required to fork the project when you're fixing
        issues related to code! Although, it all really depends on the
        contributing guidelines. Read them!
      </p>

      <h1>6. Commit, push, & request a PR 👏</h1>
      <p>
        After you've forked and cloned the project, make the changes, and after
        you've committed your changes locally, push them to the remote
        repository. Then, open a Pull Request! The maintainers will get back to
        you with new feedback if there are things to improve. Maintainers are
        usually really nice and happy to help!
      </p>

      <h1>7. Get your first PR merged to main 😎</h1>
      <p>
        Well done!! Congratulations on your first contribution to open
        source!!🎉🥳 Don't worry if you don't get it the first time.
        Contributing to open source is a skill that takes time to learn and
        fully digest!!
      </p>
    </div>
  );
}

export default Contribution;
