export default function Home() {
  return (
    <>
        <div id="hs-scrollspy-scrollable-parent-example" className=" overflow-y-auto bg-white rounded-lg pb-4 px-6">
        <div className="sm:hidden pt-6">
            <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-lg border border-gray-200 font-medium bg-white text-gray-700 shadow-2xs align-middle hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" id="hs-scrollspy-example" aria-expanded="false" aria-controls="hs-scrollspy-example-heading" data-hs-collapse="#hs-scrollspy-example-heading">
            <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6"></line>
                <line x1="3" x2="21" y1="12" y2="12"></line>
                <line x1="3" x2="21" y1="18" y2="18"></line>
            </svg>
            <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
            </svg>
            </button>
        </div>
        <div id="hs-scrollspy-example-heading" className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-scrollspy-example">
            <div data-hs-scrollspy="#hs-scrollspy-example" data-hs-scrollspy-scrollable-parent="#hs-scrollspy-scrollable-parent-example" className=" [--scrollspy-offset:57] sticky top-0 inset-x-0 py-4 flex flex-wrap gap-1 bg-white border-b border-gray-200">
            <a className="hs-scrollspy-active:border-gray-200 hs-scrollspy-active:text-gray-800 py-1 px-2.5 text-sm text-gray-500 border border-transparent rounded-full hover:text-gray-800 focus:outline-hidden focus:text-gray-800 active" href="#first">First</a>
            <a className="hs-scrollspy-active:border-gray-200 hs-scrollspy-active:text-gray-800 py-1 px-2.5 text-sm text-gray-500 border border-transparent rounded-full hover:text-gray-800 focus:outline-hidden focus:text-gray-800" href="#second">Second</a>
            <a className="hs-scrollspy-active:border-gray-200 hs-scrollspy-active:text-gray-800 py-1 px-2.5 text-sm text-gray-500 border border-transparent rounded-full hover:text-gray-800 focus:outline-hidden focus:text-gray-800" href="#third">Third</a>
            <a className="hs-scrollspy-active:border-gray-200 hs-scrollspy-active:text-gray-800 py-1 px-2.5 text-sm text-gray-500 border border-transparent rounded-full hover:text-gray-800 focus:outline-hidden focus:text-gray-800" href="#fourth">Fourth</a>
            <a className="hs-scrollspy-active:border-gray-200 hs-scrollspy-active:text-gray-800 py-1 px-2.5 text-sm text-gray-500 border border-transparent rounded-full hover:text-gray-800 focus:outline-hidden focus:text-gray-800" href="#fifth">Fifth</a>
            </div>
        </div>

        <div id="hs-scrollspy-example">
            <div id="first" className="py-10">
            <h3 className="text-lg font-semibold text-gray-800">First</h3>
            <p className="mt-1 text-sm/6 text-gray-600">This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
            </div>

            <div id="second" className="py-10">
            <h3 className="text-lg font-semibold text-gray-800">Second</h3>
            <p className="mt-1 text-sm/6 text-gray-600">This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
            </div>

            <div id="third" className="py-10">
            <h3 className="text-lg font-semibold text-gray-800">Third</h3>
            <p className="mt-1 text-sm/6 text-gray-600">This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
            </div>

            <div id="fourth" className="py-10">
            <h3 className="text-lg font-semibold text-gray-800">Fourth</h3>
            <p className="mt-1 text-sm/6 text-gray-600">This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
            </div>

            <div id="fifth" className="py-10">
            <h3 className="text-lg font-semibold text-gray-800">Fifth</h3>
            <p className="mt-1 text-sm/6 text-gray-600">This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.</p>
            </div>
        </div>
        </div>
    </>
    );
}
