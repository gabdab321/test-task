import React from "react";
import BreadCrumb from "./BreadCrumb";
import {renderWithProviders} from "../../utils/test-utils";
import {setupStore} from "../../redux/store";
import {formatStarsCount} from "../../utils/formatStarsCount/formatStarsCount";

describe("BreadCrumb", () => {
    test("renders without crashing", () => {
        const store = setupStore()
        renderWithProviders(<BreadCrumb/>, {store})
    })

    test("should write correct items in bread crumb", () => {
        const store = setupStore()
        const { getByText } = renderWithProviders(<BreadCrumb/>, {store})
        expect(getByText(store.getState().repo?.repo.name)).toBeInTheDocument()
        expect(getByText(store.getState().repo?.repo.owner.login)).toBeInTheDocument()
    })

    test("should have right href in links", () => {
        const store = setupStore()
        const { getByText } = renderWithProviders(<BreadCrumb/>, {store})
        const link1 = getByText(store.getState().repo?.repo.owner.login)
        const link2 = getByText(store.getState().repo?.repo.name)

        expect(link1.getAttribute("href")).toBe(`https://github.com/${store.getState().repo?.repo.owner.login}`)
        expect(link2.getAttribute("href")).toBe(`https://github.com/${store.getState().repo?.repo.owner.login}/${store.getState().repo?.repo.name}`)
    })

    test("should correctly write star count", () => {
        const store = setupStore()
        const { getByText } = renderWithProviders(<BreadCrumb/>, {store})

        const starsElement = getByText(/stars/i)
        expect(starsElement.textContent).toBe(`${formatStarsCount(store.getState().repo?.repo.stargazers_count)} stars`)
    })
})