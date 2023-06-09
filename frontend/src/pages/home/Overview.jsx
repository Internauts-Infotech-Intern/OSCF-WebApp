import React from "react";
import k1 from "../../images/k1.png";
import k2 from "../../images/k2.png";
import "./overview.css";

function Overview() {
    return (
        <div className="MyOverview px-3">
            <img className="my-3" src={k1}></img>
            <h1>What are Open Source Projects?</h1>
            <p>
                Open source is source code that is made freely available for possible modification and redistribution. Products include permission to use the source code, design documents, or content of the product. The open-source model is a decentralized software development model that encourages open collaboration. A main principle of open-source software development is peer production, with products such as source code, blueprints, and documentation freely available to the public. The open-source movement in software began as a response to the limitations of proprietary code. The model is used for projects such as in open-source appropriate technology, and open-source drug discovery.

                Open source promotes universal access via an open-source or free license to a product's design or blueprint, and universal redistribution of that design or blueprint. Before the phrase open source became widely adopted, developers and producers have used a variety of other terms. Open source gained hold with the rise of the Internet. The open-source software movement arose to clarify copyright, licensing, domain, and consumer issues.
            </p>

            <h1>History of Open source </h1>
            <p>
                sharing of technical information predates the Internet and the personal computer considerably. For instance, in the early years of automobile development a group of capital monopolists owned the rights to a 2-cycle gasoline-engine patent originally filed by George B. Selden. By controlling this patent, they were able to monopolize the industry and force car manufacturers to adhere to their demands, or risk a lawsuit.

                In 1911, independent automaker Henry Ford won a challenge to the Selden patent. The result was that the Selden patent became virtually worthless and a new association (which would eventually become the Motor Vehicle Manufacturers Association) was formed. The new association instituted a cross-licensing agreement among all US automotive manufacturers: although each company would develop technology and file patents, these patents were shared openly and without the exchange of money among all the manufacturers. By the time the US entered World War II, 92 Ford patents and 515 patents from other companies were being shared among these manufacturers, without any exchange of money (or lawsuits).

            </p>

            <h1>Open Source Tools And Technology </h1>
            <img className="my-3" src={k2}></img>

            <div>
                <ul>
                    <li>
                        1. Mozilla Firefox
                        Mozilla Firefox is a free and open-source internet browser that offers numerous plugins which can be accessed with a single mouse click. Available for Android, iOS, Linux, and Windows, Mozilla is free to use, modify and redistribute. Mozilla was born about 20 years ago out of the open-source software movement, and over the years, it reshaped the technology industry and the way social networks and operating systems operate. Today, open-source is mainstream, and it powers tech giants like Google, Facebook, and even Microsoft.
                    </li>
                    <li>

                        <b>Faster, More-Transparent Development:</b> Closed-source software can often be a black box that neither developers nor business users (who aren’t programmers themselves) can’t meaningfully alter or enhance. As a result, when you experience challenges, you’ll need to partner with vendor support agents or just wait until the vendor builds a solution to your problem. Open-source projects give you full visibility into the code base, which means you can frequently code your solutions and directly document your issues in community spaces. And you may receive a variety of responses that provide as much or more context as you’d receive from a professional support team, as fast or faster.

                    </li>
                    <li>
                        <b> Better, Community-Based Collaboration</b>: Work with an entire community of other developers all using the same tools, who may have experienced similar issues and may already have solutions to share.
                    </li>
                    <li>
                        <b>Scalability:</b> Because different OSS projects offer different configurations for hosting and load balancing, they can offer more flexibility concerning your need to scale data usage up or down.

                    </li>
                    <li>
                        <b>Community-Driven Security:</b> Open-source products often offer surprisingly robust security as teams tend to test extensively before releasing new versions. Many successful open-source communities attract security experts who also make additions to the project. That said, it may be worth mentioning that unless the community designates an ongoing security team, open-source projects may lack a dedicated resource to ensure ongoing security.
                    </li>
                    <li>
                        <b>Low Cost Up Front:</b> And of course, unlike proprietary software solutions, most open-source projects are free of charge by default, though they may have specific licensing restrictions. A permissive open-source license, such as BSD, provides software as-is but lets developers do what they want with the code, so long as they acknowledge the creators. A copyleft license, such as GPL, requires developers that distribute binaries also make source code available under the same terms, and forbids putting additional restrictions on any subsequent licensees.
                    </li>
                    <li>
                        <b>Low Cost on an Ongoing Basis: </b>Depending on the nature of the license, continuing to use an open-source product can mean lower or no ongoing maintenance fees. In contrast to OSS, any proprietary counterparts will not only require upfront costs but will also involve subscription fees and potential follow-on costs for additional service hours.
                    </li>
                    <li>
                        <b>More Employment Opportunities:</b> Some of the most widely used technical tools and operating systems on the market today are open source: the Linux operating system, the Kubernetes container platform, the Django Python framework, and many others. Developers that are familiar with popular open-source tools and are passionate enough to contribute to them can find it easier to locate new job opportunities with employers that recognize such valuable skills.
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Overview;