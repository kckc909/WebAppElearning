import React from 'react';
import { Save, Lock, Bell, Globe, Mail } from 'lucide-react';

const Settings: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Manage your application configuration and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">General Configuration</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Basic system information and site-wide settings.
                    </p>
                </div>

                <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">Site Name</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"><Globe size={16} className="mr-2" /> </span>
                                        <input type="text" name="website" id="website" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="My Super App" defaultValue="SuperAdmin Pro" />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="support-email" className="block text-sm font-medium leading-6 text-gray-900">Support Email</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"><Mail size={16} className="mr-2" /> </span>
                                        <input type="email" name="support-email" id="support-email" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="support@example.com" defaultValue="admin@company.com" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="maintenance" className="flex items-center gap-3">
                                    <input type="checkbox" id="maintenance" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600" />
                                    <span className="text-sm font-medium text-gray-900">Enable Maintenance Mode</span>
                                </label>
                                <p className="mt-1 text-sm text-gray-500 pl-7">Prevents non-admin users from accessing the site.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 flex items-center gap-2">
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 pt-8 border-t border-gray-200">
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Security</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Update password policies and session timeouts.
                    </p>
                </div>

                <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="session-timeout" className="block text-sm font-medium leading-6 text-gray-900">Session Timeout (minutes)</label>
                                <div className="mt-2">
                                    <input type="number" name="session-timeout" id="session-timeout" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" defaultValue="30" />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex items-center gap-2">
                                    <Lock size={16} /> Force Password Reset for All Users
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button type="submit" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 flex items-center gap-2">
                            <Save size={16} /> Save Security Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;