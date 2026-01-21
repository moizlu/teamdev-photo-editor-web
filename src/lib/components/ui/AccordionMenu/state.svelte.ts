export const AccordionMenuOpenEvent = new Event('accordionMenuOpen');

export const isMenuOpened = $state({
    _value: false,
    get: () => isMenuOpened._value,
    set: (value: boolean) => {
        isMenuOpened._value = value;
        if (value) {
            document.dispatchEvent(AccordionMenuOpenEvent);
        }
    }
});
